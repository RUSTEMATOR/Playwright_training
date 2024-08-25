
export default class AuthController {
    #SIGN_IN_PATH = '/api/auth/signin'

    constructor(request) {
        this._request = request
    }


    async signIn(requestBody) {
        console.log('Signing in...')
        return this._request.post(this.#SIGN_IN_PATH, {
            data: requestBody
        })
    }
}