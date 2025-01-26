// Este componente es una ruta protegida en React, utilizada para restringir el acceso a ciertas rutas según la autenticación del usuario.
// Si el usuario no está autenticado, será redirigido a la página de inicio de sesión.

import { Navigate, Outlet } from "react-router-dom"; // Importar herramientas de navegación y renderizado condicional de React Router
import { useAuth } from "./context/AuthContext"; // Importar el contexto de autenticación para acceder al estado de autenticación

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth(); // Obtener el estado de carga y autenticación del contexto

  if (loading) return <h1>Loading...</h1>; // Mostrar un mensaje de carga mientras el estado de autenticación se verifica
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />; // Redirigir a "/login" si no está autenticado
  return <Outlet />; // Renderizar las rutas hijas si está autenticado
}

export default ProtectedRoute; // Exportar el componente para su uso en las rutas
