import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

function Layout() {

  const { logout, user } = useAuth()
  return (
    <>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/buses" className="text-2xl font-bold text-primary">
                CIVA 
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Bienvenido, <span className='text-green-600'>{user.username}</span></span>
                <button
                  onClick={logout}
                  className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
    </main>
    </>
  )
}

export default Layout