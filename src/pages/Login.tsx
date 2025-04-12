import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/buses")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(username, password)
    } catch (err) {
      setError("Username o contraseña incorrectos.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900">CIVA BUSES</h1>
          <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Login</h2>
        </div>
        <form className="flex justify-center flex-col mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className=''>
            <p className="text-center text-sm text-gray-500">
              Cuenta 1: Acceso total
              <br />
              admin / 1234
              <br />
              Cuenta 2: Solo ver lista de buses.
              <br />
              usuario / 1234
            </p>
          </div>

          <button
            className="rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 "
            data-ripple-light="true"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          La seguridad del sistema tiene roles y trabaja con token de acceso y refresco. <br />
          El token de acceso expira en <span className="font-medium text-gray-700">3 min</span> y el refresh token en{" "}
          <span className="font-medium text-gray-700">5 min</span> por defecto. <br />
          Si el refresh token expira, se cerrará la sesión automáticamente.
        </div>
      </div>
    </div>
  )
}

export default Login