# 🚍 CIVA Buses - Frontend

Este proyecto es la interfaz de usuario del sistema de gestión de buses CIVA, desarrollado con **React**.  
Se comunica con el backend mediante peticiones HTTP protegidas por **JWT** y gestiona la autenticación del usuario, control de roles, y funcionalidades como paginación y manejo de errores.

---

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

