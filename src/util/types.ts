//Bus
export interface Bus {
  id: number
  numeroBus: string
  placa: string
  fechaCreacion: Date
  caracteristicas: string
  marca : {
    id: number
    nombre: string
  }
  activo: boolean
}

export interface BusListResponse {
  content : Bus[]
  pageNumber: number
  pageSize: number
  totalPages: number
  lastPage: boolean
  firstPage: boolean
}


//Auth
export interface DecodedToken {
  username: string
  role: { authority: string }[]
  [key: string]: any
}

export interface User {
  username: string
  roles: string[]
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}
  