type SSOapp = {
    ID: string,
    KEY: string,
    DATA: any,
}



const AppDB: SSOapp[] = [
    { ID: '1234', KEY: 'app1@5832', DATA: {} },
    { ID: '9851', KEY: 'app2@8103', DATA: {} }
]

type userAuthCodes = SSOapp & { userEmail: string, authcode: string }

const UserLogins: userAuthCodes[] = []


export function getAccessToken(id: string, usermail: string) {

    const app = AppDB.find((_app) => _app.ID === id)

    if (app) {
        const authCode = Math.random().toString(36).substring(2, 15);
        const authentry = { ...app, userEmail: usermail, authcode: authCode }
        UserLogins.push(authentry)
        return authentry.authcode
    }

    return null
}


export function VerifyToken(AuthCode: string, ClientID: string, key: string) {

    const UserInfoID = UserLogins.findIndex((info) => (info.authcode === AuthCode && info.KEY === key && info.ID === ClientID))

    const UserInfo = UserLogins[UserInfoID]
    UserLogins.splice(UserInfoID, 1)

    return UserInfo

}
