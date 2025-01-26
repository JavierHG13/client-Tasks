import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const {isAuthenticated,logout,user}=useAuth()
    console.log(user)
    const navigate=useNavigate()
    const handleLogout = () => {
        logout();
        navigate("/");
    };
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to='/'>
        <h1 className="text-2xl h1-form">Gestor de Tareas</h1>
        </Link>
        <ul className="flex gap-x-2 tasks">
            {isAuthenticated?(
                <>
                <li>Bienvenido {user.username} </li>
                <li>
                    <Link to="/tasks" className="bg-indigo-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500">Ver Tareas</Link>
                </li>
             <li>
                <Link to="/add-task" className="bg-indigo-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500">Agregar Tarea</Link> 
             </li>
             <li>
                <Link  onClick={handleLogout} className="bg-indigo-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500">Cerrar Sesion</Link> 
             </li>
                </>
            ):(
                <>
                <li>
                <Link to='/login' className="bg-indigo-500 px-4  py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500">Iniciar Sesion</Link> 
             </li>
             <li>
                <Link to='/register' className="bg-indigo-500 px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500">Registrar</Link> 
             </li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar