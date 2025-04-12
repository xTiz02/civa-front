import { useAuth } from "../context/auth-context"
import { config as c } from "../util/environment"

interface ErrorResponse {
  status: number
  error: string
  timestamp :string
  message :string
}

export const useAuthFetch = () => {
  const { logout } = useAuth()

  const authFetch = async (path: string, options: RequestInit = {}) => {
    let accessToken = localStorage.getItem(c.ACCESS_TOKEN_LABEL)
    let refreshToken = localStorage.getItem(c.REFRESH_TOKEN_LABEL)

    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }

    const doFetch = async () => {
      const url = `${c.API_URL}/${path}`
      try{
        return await fetch(url, {
          ...options,
          headers,
        })
      }catch (error) {
        console.error("Error en la petición:", error)
        throw new Error("No se pudo conectar al servidor. Verifica tu conexión e intenta nuevamente.")
      }
      
    }

    let response = await doFetch()

    if (response.ok) {
      return response
    }else{
      if(response.status === 401){
        try {
          const errorBody = (await response.json()) as ErrorResponse
  
          if (errorBody.error === c.JWT_EXPIRED_ERROR) {
            if (!refreshToken) throw new Error("No hay refresh token")
            console.log("Refresh token encontrado, intentando refrescar el token...")
  
            const refreshResponse = await fetch(`${c.API_URL}/auth/refresh`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            })
  
            if (!refreshResponse.ok) {
              const refreshError = (await refreshResponse.json()) as ErrorResponse
  
              if (refreshError.error === c.REFRESH_TOKEN_EXPIRED_ERROR) {
                console.log("Refresh token expirado, cerrando sesión...")
                logout()
                return Promise.reject(new Error("El refresh token expiró"))
              }
  
              throw new Error("Error al refrescar token")
            }
            console.log("Access Token refrescado exitosamente")
  
            const newTokens = await refreshResponse.json()
            localStorage.setItem(c.ACCESS_TOKEN_LABEL, newTokens.accessToken)
            localStorage.setItem(c.REFRESH_TOKEN_LABEL, newTokens.refreshToken)
  
            accessToken = newTokens.accessToken
            headers.Authorization = `Bearer ${accessToken}`
  
            // Reintentar la petición
            response = await doFetch()

          } else {
            logout()
            return Promise.reject(new Error("Error de autenticación"))
          }
        } catch (error) {
          logout()
          return Promise.reject(error)
        }
      }
    }

    return response
  }

  return { authFetch }
}

