import {
    ContentRating,
    SourceInfo,
    BadgeColor,
    DUISection,
    SourceStateManager
} from '@paperback/types'
import {
    getExportVersion, 
    Main
} from '../Main'

const HOST = 'NetTruyen'
const Domain = 'www.nettruyenus.com'
import tags from './tags.json'
const STATE_SESSION = 'token'
const STATE_CREDENTIALS = 'credentials'

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

export interface Credentials {
    email: string;
    password: string;
}

export function validateCredentials(credentials: unknown): credentials is Credentials {
    return (
        credentials != null &&
        typeof credentials === 'object' &&
        (credentials as Credentials).password !== '' &&
        (credentials as Credentials).email !== ''
    )
}

export async function getUserCredentials(stateManager: SourceStateManager): Promise<Credentials | undefined> {
    const credentialsString = await stateManager.keychain.retrieve(STATE_CREDENTIALS)
    if (typeof credentialsString !== 'string') {
        return undefined
    }

    const credentials = JSON.parse(credentialsString)
    if (!validateCredentials(credentials)) {
        console.log('store contains invalid credentials!')
        return undefined
    }

    return credentials
}

export async function setUserCredentials(stateManager: SourceStateManager, credentials: Credentials): Promise<void> {
    if (!validateCredentials(credentials)) {
        console.log(`tried to store invalid mu_credentials: ${JSON.stringify(credentials)}`)
        throw new Error('tried to store invalid mu_credentials')
    }

    await stateManager.keychain.store(STATE_CREDENTIALS, JSON.stringify(credentials))
}

export async function clearUserCredentials(stateManager: SourceStateManager): Promise<void> {
    await stateManager.keychain.store(STATE_CREDENTIALS, undefined)
}

export async function getSessionToken(stateManager: SourceStateManager): Promise<string | undefined> {
    const sessionToken = await stateManager.keychain.retrieve(STATE_SESSION)
    return typeof sessionToken === 'string' ? sessionToken : undefined
}

export async function setSessionToken(stateManager: SourceStateManager, sessionToken: string): Promise<void> {
    if (typeof sessionToken !== 'string') {
        console.log(`tried to store invalid token: ${sessionToken}`)
        throw new Error('tried to store invalid token')
    }

    await stateManager.keychain.store(STATE_SESSION, sessionToken)
}

export async function clearSessionToken(stateManager: SourceStateManager): Promise<void> {
    await stateManager.keychain.store(STATE_SESSION, undefined)
}

export class Nettruyen extends Main {
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}/`
    UseId = true

    SearchWithGenres = true
    SearchWithNotGenres = true
    SearchWithTitleAndGenre = true

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
}
