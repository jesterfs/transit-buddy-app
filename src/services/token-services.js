import config from '../config'


const TokenService = {
  saveAuthToken(token, userId) {
    window.localStorage.setItem(config.TOKEN_KEY, JSON.stringify({token, userId}))
  },
  getAuthToken() {

    const info = this.getAuthInfo()
    return info ? info.token : null
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  getAuthInfo() {
    return JSON.parse(window.localStorage.getItem(config.TOKEN_KEY))
  },
}

export default TokenService
