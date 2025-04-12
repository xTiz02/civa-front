import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginResponse, User } from "../util/types"
import { clearDataFromLocalStorage, parseJwtAndExtractUser, saveDataToLocalStorage } from "../util/token-service"
import { config as c } from "../util/environment"

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem(c.ACCESS_TOKEN_LABEL)
    const user = localStorage.getItem(c.USER_LABEL)

    if (accessToken && user) {
      try {
        const parsedUser = JSON.parse(user) as User
        setAuthState({
          accessToken,
          user: parsedUser,
          isAuthenticated: true,
        })
      } catch (error) {
        console.error("Fallo al parsear el usuario:", error)
        logout()
      }
    } else {
      console.log("No hay token de acceso o usuario en el almacenamiento local. Redirigiendo a la página de inicio de sesión.")
      navigate("/login") 
    }
  }, [])

  
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${c.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Login error")
      }

      const data = (await response.json()) as LoginResponse

      console.log("Login exitoso:", data)

      const user = parseJwtAndExtractUser(data.accessToken)
      
      saveDataToLocalStorage(data.accessToken, data.refreshToken, user)

      setAuthState({
        accessToken: data.accessToken,
        user: user,
        isAuthenticated: true,
      })

      navigate("/buses")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }


  const logout = async  () => {
    const refreshToken = localStorage.getItem(c.REFRESH_TOKEN_LABEL)

    try {
      if (refreshToken) {
        await fetch(`${c.API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        })
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }

    clearDataFromLocalStorage()

    setAuthState({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    })

    navigate("/login")
  }

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
