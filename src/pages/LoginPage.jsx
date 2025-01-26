import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const { signin, errors: signinErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks")
  }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-center h1-form text-gray-300 text-2xl mb-4">Login</h1>
        <br />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="confirmPassword" className="text-gray-400">Ingrese su correo electronico</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white tasks px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 tasks">El correo es requerido</p>
          )}

          <label htmlFor="password" className="text-gray-400">Ingrese su contraseña</label>

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white tasks px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Contraseña"
          />

          {errors.password && (
            <p className="text-red-500 tasks">La contrasena es requerida</p>
          )}
          {
            signinErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                {error}
              </div>
            ))
          }
          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          ¿Aún no tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline hover:text-blue-600 transition "
          >
            Regístrate ahora
          </Link>
        </p>

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link to="/forgot-password" className="text-blue-500 hover:underline hover:text-blue-600 transition "
          >
            ¿Olvidaste tu contraseña?
          </Link>

        </p>
      </div>
    </div>
  )
}

export default LoginPage