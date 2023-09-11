import {
    BadgeColor,
    ContentRating,
    DUIForm,
    DUISection,
    MangaProgress,
    MangaProgressProviding,
    Request,
    RequestManager,
    Response,
    SourceInfo,
    SourceIntents,
    TrackerActionQueue
} from '@paperback/types'
import {
    DOMAIN,
    getExportVersion,
    Main
} from '../Main'
import {
    clearSessionToken,
    clearUserCredentials,
    Credentials,
    getLoginTime,
    getSessionRefreshToken,
    getSessionToken,
    getUserCredentials, 
    setLoginTime,
    setSessionToken,
    setUserCredentials,
    validateCredentials
} from './NettruyenAuth'
import tags from './tags.json'

const HOST = 'NetTruyen'
const Domain = 'www.nettruyenus.com'

export const NettruyenInfo: SourceInfo = {
    description: '',
    icon: 'icon.jpg',
    websiteBaseURL: '',
    version: getExportVersion('0.3.0'),
    name: 'Nettruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.EVERYONE,
    sourceTags: [
        {
            text: '16+',
            type: BadgeColor.GREEN
        }
    ],
    intents: SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.MANGA_CHAPTERS | SourceIntents.MANGA_TRACKING | SourceIntents.SETTINGS_UI
}

export class Nettruyen extends Main implements MangaProgressProviding{
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}/`
    UseId = true

    SearchWithGenres = true
    SearchWithNotGenres = true
    SearchWithTitleAndGenre = true

    override requestManager: RequestManager = App.createRequestManager({
        requestsPerSecond: this.requestsPerSecond,
        requestTimeout: this.requestTimeout,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {

                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'referer': this.HostDomain
                    },
                    ...(await getSessionToken(this.stateManager) != null ? {
                        'authorization': `Bearer ${await getSessionToken(this.stateManager)}`
                    } : {})
                }

                return request
            },
            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    })

    async getSourceMenu(): Promise<DUISection> {
        return App.createDUISection({
            id: 'sourceMenu',
            isHidden: false, 
            rows: async () =>  {
                const [credentials] = await Promise.all([
                    getUserCredentials(this.stateManager)
                ])
                
                if (credentials?.email) {
                    return [
                        App.createDUILabel({
                            id: 'userInfo',
                            label: 'Logged as',
                            value: credentials.email
                        }),
                        App.createDUILabel({
                            id: 'loginTime',
                            label: 'Session started at',
                            value: await getLoginTime(this.stateManager)
                        }),
                        App.createDUIButton({
                            id: 'refresh',
                            label: 'Refresh session',
                            onTap: async () => this.refreshSession()
                        }),
                        App.createDUIButton({
                            id: 'logout',
                            label: 'Logout',
                            onTap: async () => this.logout()
                        })
                    ]
                }
                return [
                    App.createDUINavigationButton({
                        id: 'loginButton',
                        label: 'Login',
                        form: App.createDUIForm({
                            sections: async () => [
                                App.createDUISection({
                                    id: 'usernameSection',
                                    header: 'Email',
                                    footer: 'Enter your email',
                                    isHidden: false,
                                    rows: async () => [
                                        App.createDUIInputField({
                                            id: 'email',
                                            placeholder: 'Email',
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            //@ts-ignore also accepts a raw value, not just a DUIBinding
                                            value: '',
                                            maskInput: false
                                        })
                                    ]
                                }),
                                App.createDUISection({
                                    id: 'passwordSection',
                                    header: 'Password',
                                    footer: 'Enter your password',
                                    isHidden: false,
                                    rows: async () => [
                                        App.createDUIInputField({
                                            id: 'password',
                                            placeholder: 'Password',
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            //@ts-ignore also accepts a raw value, not just a DUIBinding
                                            value: '',
                                            maskInput: true
                                        })
                                    ]
                                })
                            ],
                            onSubmit: (values) => this.login(values as Credentials)
                        })
                    })
                ]
            }
        })
    }

    private async login(credentials: Credentials): Promise<void> {
        const logPrefix = '[login]'
        console.log(`${logPrefix} starts`)

        if (!validateCredentials(credentials)) {
            console.error(`${logPrefix} login called with invalid credentials: ${JSON.stringify(credentials)}`)
            throw new Error('Cần bấm vào ô input khác thì mới cập nhật giá trị!!')
        }

        try {
            const request = App.createRequest({
                method: 'POST', 
                url: `https://hoang3409.link/api/Auth/Login?email=${credentials.email}&password=${credentials.password}`
            })
            const result = await this.requestManager.schedule(request, 1)
            const json = typeof result.data === 'string' ? JSON.parse(result.data) : result.data
            if (json.error) {
                throw new Error(json.error.message)
            }
            const sessionToken = json

            await Promise.all([
                setUserCredentials(this.stateManager, credentials),
                setSessionToken(this.stateManager, sessionToken),
                setLoginTime(this.stateManager)
            ])
            
            console.log(`${logPrefix} complete`)
        } catch (e: any) {
            console.log(`${logPrefix} failed to log in`)
            console.log(e)
            throw new Error(e.message)
        }
    }

    private async logout(): Promise<void> {
        await Promise.all([clearUserCredentials(this.stateManager), clearSessionToken(this.stateManager)])
    }

    private async refreshSession(): Promise<void> {
        const logPrefix = '[refreshSession]'
        console.log(`${logPrefix} starts`)

        const credentials = await getUserCredentials(this.stateManager)
        if (!credentials) {
            console.log(`${logPrefix} no credentials available, unable to refresh`)
            throw new Error('Could not find login credentials!')
        }
        
        const refreshToken = await getSessionRefreshToken(this.stateManager)
        if (!refreshToken) {
            console.log(`${logPrefix} no refresh token available, unable to refresh`)
            throw new Error('Could not find refresh token!')
        }

        const response = await this.requestManager.schedule(App.createRequest({
            url: `${DOMAIN}Auth/RefreshToken?token=${refreshToken}`,
            method: 'POST'
        }), 0)
        const json = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        if (json.error) {
            throw new Error(json.error.message)
        }
        await setSessionToken(this.stateManager, json)
        await setLoginTime(this.stateManager)

        console.log(`${logPrefix} complete`)
    }
    
    async getMangaProgress(mangaId: string): Promise<MangaProgress | undefined> {
        const logPrefix = '[getMangaProgress]'
        console.log(`${logPrefix} starts`)
        try {
            console.log(`${logPrefix} loading id=${mangaId}`)

            const request = await this.requestManager.schedule(App.createRequest({
                url: `${DOMAIN}Service/GetProcess?idComic=${mangaId}`,
                method: 'GET'
            }), 1)
            const result = typeof request.data === 'string' ? JSON.parse(request.data) : request.data

            if (!result) return undefined 
            
            const progress = App.createMangaProgress({
                mangaId: mangaId,
                lastReadChapterNumber: result.currentChapterNumber ?? 0
            })

            console.log(`${logPrefix} complete`)
            return progress
        } catch (ex) {
            console.log(`${logPrefix} error`)
            console.log(ex)
            throw ex
        }
    }

    async getMangaProgressManagementForm(mangaId: string): Promise<DUIForm> {
        return App.createDUIForm({
            sections: async () => {
                const [credentials] = await Promise.all([
                    getUserCredentials(this.stateManager)
                ])
                const [response] = await Promise.all([
                    this.requestManager.schedule(App.createRequest({
                        url: `${DOMAIN}${this.Host}/Manga?url=${mangaId}`,
                        method: 'GET'
                    }), 1)
                ])
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
                
                if (credentials == null) {
                    return [
                        App.createDUISection({
                            id: 'notLoggedInSection',
                            isHidden: false,
                            rows: async () => [
                                App.createDUILabel({
                                    id: 'notLoggedIn',
                                    label: 'Not Logged In'
                                })
                            ]
                        })
                    ]
                }

                return [
                    App.createDUISection({
                        id: 'userInfo',
                        isHidden: false,
                        rows: async () => [
                            App.createDUIHeader({
                                id: 'header',
                                imageUrl: '',
                                title: credentials.email ?? 'NOT LOGGED IN',
                                subtitle: ''
                            })
                        ]
                    }),
                    App.createDUISection({
                        id: 'information',
                        header: 'Information',
                        isHidden: false,
                        rows: async () => [
                            App.createDUILabel({
                                id: 'mediaId',
                                label: 'Manga ID',
                                value: data.id?.toString()
                            }),
                            App.createDUILabel({
                                id: 'mangaTitle',
                                label: 'Title',
                                value: data.title[0].title ?? 'N/A'
                            }),
                            App.createDUILabel({
                                id: 'mangaStatus',
                                value: data.status,
                                label: 'Status'
                            }),
                            App.createDUILabel({
                                id: 'mangaIsAdult',
                                value: data.nsfw,
                                label: 'Is Adult'
                            })
                        ]
                    })
                ]
            }
        })
    }

    async processChapterReadActionQueue(actionQueue: TrackerActionQueue): Promise<void> {
        const chapterReadActions = await actionQueue.queuedChapterReadActions()
        for (const readAction of chapterReadActions) {
            console.log(`readAction.mangaId: ${readAction.mangaId} | ${readAction.sourceChapterId}`)
            try 
            {
                const _response = await this.requestManager.schedule(App.createRequest({
                    url: `${DOMAIN}Service/SaveProcess?idComic=${readAction.mangaId}&idChapter=${readAction.sourceChapterId}`,
                    method: 'GET'
                }), 1)
                const data = typeof _response.data === 'string' ? JSON.parse(_response.data) : _response.data
                if (data.message === 'Success') {
                    console.log(`Save success ${readAction.mangaId}`)
                } 
            }
            catch (error) {
                console.log(error)
                console.log(`Save failed ${readAction.mangaId}`)
                await actionQueue.retryChapterReadAction(readAction)
            }
        }
    }
}
