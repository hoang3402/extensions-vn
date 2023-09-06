import {
    ContentRating,
    SourceInfo,
    BadgeColor,
    RequestManager, 
    Request, 
    Response,
    DUIForm,
    DUISection,
    MangaProgress,
    MangaProgressProviding,
    TrackerActionQueue
} from '@paperback/types'
import {
    DOMAIN,
    getExportVersion,
    Main
} from '../Main'
import {
    Credentials,
    clearSessionToken,
    clearUserCredentials,
    getSessionToken,
    getUserCredentials,
    setSessionToken,
    setUserCredentials,
    validateCredentials
} from './NettruyenAuth'

const HOST = 'NetTruyen'
const Domain = 'www.nettruyenus.com'
import tags from './tags.json'

export const NettruyenInfo: SourceInfo = {
    description: '',
    icon: 'icon.jpg',
    websiteBaseURL: '',
    version: getExportVersion('0.2.4'),
    name: 'Nettruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.EVERYONE,
    sourceTags: [
        {
            text: '16+',
            type: BadgeColor.GREEN
        }
    ]
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
            const sessionToken = json.idToken

            await Promise.all([
                setUserCredentials(this.stateManager, credentials),
                setSessionToken(this.stateManager, sessionToken)
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
                    })
                ]
            }
        })
    }

    async processChapterReadActionQueue(actionQueue: TrackerActionQueue): Promise<void> {
        // console.log(actionQueue.queuedChapterReadActions())
        const chapterReadActions = await actionQueue.queuedChapterReadActions()
        for (const readAction of chapterReadActions) {
            console.log(readAction.mangaId)
        }
        return Promise.resolve(undefined)
    }
}
