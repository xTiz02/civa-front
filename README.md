# 🚍 CIVA Buses - Frontend

Resolución del reto técnico de la empresa CIVA, desarrollado con **React**.  
Se comunica con el backend mediante peticiones HTTP protegidas por **JWT** y gestiona la autenticación del usuario, control de roles, y funcionalidades como paginación y manejo de errores.

## ⚙️ Configuración del Proyecto

### 🔧 environment.ts

```properties
export const config = {
    API_URL: "http://localhost:8085",
    ACCESS_TOKEN_LABEL: "accessToken",
    REFRESH_TOKEN_LABEL: "refreshToken",
    USER_LABEL: "user",
    JWT_EXPIRED_ERROR :"ACCESS_TOKEN_EXPIRED",
    REFRESH_TOKEN_EXPIRED_ERROR : "REFRESH_TOKEN_EXPIRED"
}
```

## 🔐 Autenticación y Seguridad

- El frontend utiliza **tokens JWT** para autenticarse con el backend.
- Los tokens se almacenan en `localStorage` y se envían automáticamente en cada solicitud autenticada.
- Si el token de acceso expira, el sistema intenta **refrescar el token** con el refresh token.
- Si el refresh token también ha expirado, se **cierra la sesión automáticamente**.

---

## 👤 Roles y Autorización

El sistema reconoce los siguientes **roles**:

- `buses_view_list`: puede acceder al listado de buses.
- `buses_view_detail`: puede ver el detalle de un bus específico.

Los componentes están protegidos usando un **contexto de autenticación**, y el enrutamiento se gestiona con `React Router`.

---

## 🔁 Manejo de Tokens

- **Token de acceso**: válido por 3 minutos.
- **Refresh token**: válido por 5 minutos.

Si ocurre un error de autenticación, el sistema automáticamente intenta refrescar el token y reintenta la petición original.

---

## 📄 Paginación

El listado de buses implementa **paginación por servidor**.  
Los parámetros de página (`page`) y cantidad por página (`size`) son enviados en cada petición para mostrar los datos en secciones más manejables.

---

## ⚠️ Manejo de Errores

- Se capturan errores HTTP y de red en cada llamada a la API.
- Mensajes de error personalizados son mostrados al usuario cuando:
  - No hay conexión al servidor.
  - El usuario no tiene permisos.
  - El token ha expirado.

---

## 🧰 Tecnologías Usadas

- React con Vite
- TypeScript
- React Router DOM
- Tailwind CSS
- Context API (para autenticación)
- Fetch API (para llamadas HTTP)

