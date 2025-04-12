import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Bus } from "../util/types"
import { useAuthFetch } from "../hook/use-fetch"

export default function BusDetail() {
  const { authFetch } = useAuthFetch()
  const [bus, setBus] = useState<Bus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const busId = params.id as string

  const fetchBusDetail = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await authFetch(`bus/${busId}`, { method: "GET" })
      
      if (!response.ok) {
        if(response.status === 403) {
          throw new Error("No tienes permiso para acceder a esta página.")
        }else{
          throw new Error("Error al cargar los detalles del bus.")
        }
      }

      const data = (await response.json()) as Bus
      setBus(data)
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
    fetchBusDetail()
  }, [busId])

  return (
    
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Detalle de Bus</h1>
          <Link
            to="/buses"
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Volver a la lista
          </Link>
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
        ) : bus ? (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{bus.id}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Número</dt>
                  <dd className="mt-1 text-sm text-gray-900">{bus.numeroBus}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Placa</dt>
                  <dd className="mt-1 text-sm text-gray-900">{bus.placa}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Marca</dt>
                  <dd className="mt-1 text-sm text-gray-900">{bus.marca.nombre}</dd>
                </div>
                

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Fecha de creación</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(bus.fechaCreacion).toLocaleString()}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Estado</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        bus.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bus.activo ? "Activo" : "Inactivo"}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Caracteristicas</dt>
                  <dd className="mt-1 text-sm text-gray-900">{bus.caracteristicas}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="text-sm text-yellow-700">Bus no encontrado</div>
          </div>
        )}
      </div>
  )
}
