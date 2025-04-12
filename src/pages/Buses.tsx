import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import { Bus, BusListResponse } from "../util/types"
import { useAuthFetch } from "../hook/use-fetch"


function Buses() {
  const { authFetch } = useAuthFetch()
  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchBuses = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await authFetch(`bus?page=${page - 1}&size=5`, { method: "GET" })

      if (!response.ok) {
        if(response.status === 403) {
          throw new Error("No tienes permiso para acceder a esta página.")
        }else{
          throw new Error("Error al cargar los buses.")
        }
      }

      const data = (await response.json()) as BusListResponse
      setBuses(data.content)
      setTotalPages(data.totalPages)
      setPage(data.pageNumber + 1)
    } catch (err) {
      if (err instanceof Error) {
        
        setError(err.message)
      }else{
        
        setError("Error inesperado. Por favor, intenta de nuevo más tarde.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuses()
  }, [page])

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Listado de Buses</h1>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Número
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Placa
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Marca
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {buses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                        No se encontró buses.
                      </td>
                    </tr>
                  ) : (
                    buses.map((bus) => (
                      <tr key={bus.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{bus.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{bus.numeroBus}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{bus.placa}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{bus.marca.nombre}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              bus.activo  ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {bus.activo ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <Link to={`/bus/${bus.id}`} className="text-primary hover:text-primary/80 underline">
                            Ver Detalle
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Página {page} de {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={previousPage}
                  disabled={page === 1}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </div>
  )
}

export default Buses
