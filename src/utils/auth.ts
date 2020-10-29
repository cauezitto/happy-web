import jwt from 'jsonwebtoken'
const tokenKey = '@happyAccessToken'
const rememberKey = "@happyRememberToken"

export default {
    isAuthenticated(){
        const token = this.getToken()

        if(!token){
            return false
        }

        return true
    },

    isAdmin(){
        const token = this.getToken()

        if(!token){
            return false
        }

        const decoded: any = jwt.decode(token)

        if(!decoded){
            return false
        }

        return decoded.admin


    },

    getToken(){
        const token = localStorage.getItem(tokenKey)

        if(!token){
            return sessionStorage.getItem(tokenKey)
        }
        return token
    },

    storeToken(token: string, isSessionStorage?: boolean){
        if(!isSessionStorage){
            localStorage.setItem(tokenKey, token)
        }
        
        else{
        sessionStorage.setItem(tokenKey, token)
        }
    },

    eraseToken(){
        const token = localStorage.getItem(tokenKey)

        if(!token){
            sessionStorage.removeItem(tokenKey)
            return
        }

        localStorage.removeItem(tokenKey)
    },
}