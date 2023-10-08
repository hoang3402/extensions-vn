import { SourceStateManager } from '@paperback/types'

export const STATE_SESSION = 'token'
export const STATE_REFRESH_SESSION = 'refresh token'
export const STATE_CREDENTIALS = 'credentials'
export const STATE_TIME_LOGIN = 'time'

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

export async function getSessionRefreshToken(stateManager: SourceStateManager): Promise<string | undefined> {
    const sessionToken = await stateManager.keychain.retrieve(STATE_REFRESH_SESSION)
    return typeof sessionToken === 'string' ? sessionToken : undefined
}

export async function setSessionToken(stateManager: SourceStateManager, sessionToken: any): Promise<void> {
    if (!sessionToken.idToken || !sessionToken.refreshToken) {
        console.log(`tried to store invalid token: ${sessionToken}`)
        throw new Error('tried to store invalid token')
    }

    await stateManager.keychain.store(STATE_SESSION, sessionToken.idToken)
    await stateManager.keychain.store(STATE_REFRESH_SESSION, sessionToken.refreshToken)
}

export async function clearSessionToken(stateManager: SourceStateManager): Promise<void> {
    await stateManager.keychain.store(STATE_SESSION, undefined)
    await stateManager.keychain.store(STATE_REFRESH_SESSION, undefined)
}

export async function getLoginTime(stateManager: SourceStateManager) {
    const sessionToken = await stateManager.keychain.retrieve(STATE_TIME_LOGIN)
    return typeof sessionToken === 'string' ? sessionToken : undefined
}

export async function setLoginTime(stateManager: SourceStateManager) {
    const currentTime = new Date()
    await stateManager.keychain.store(STATE_TIME_LOGIN, currentTime.toTimeString())
}