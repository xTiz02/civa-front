import { jwtDecode } from "jwt-decode"
import { DecodedToken, User } from "./types"
import { config as c } from "./environment"


export function parseJwtAndExtractUser(accessToken: string): User {
    const decoded = jwtDecode<DecodedToken>(accessToken)
  
    const roles = decoded.role.map((auth) => auth.authority)
  
    const user: User = {
      username: decoded.username,
      roles,
    }
  
    return user
}

export function saveDataToLocalStorage(accessToken: string, refreshToken: string, user: User) {
    localStorage.setItem(c.ACCESS_TOKEN_LABEL, accessToken)
    localStorage.setItem(c.REFRESH_TOKEN_LABEL, refreshToken)
    localStorage.setItem(c.USER_LABEL, JSON.stringify(user))
}

export function clearDataFromLocalStorage() {
    localStorage.removeItem(c.ACCESS_TOKEN_LABEL)
    localStorage.removeItem(c.REFRESH_TOKEN_LABEL)
    localStorage.removeItem(c.USER_LABEL)
}