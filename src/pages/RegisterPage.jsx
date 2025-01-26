import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaKey } from "react-icons/fa"; // Importar íconos adicionales

function RegisterPage() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = async (values) => {
    signup(values);
  };

  return (
    <div className="mt-[80px] flex justify-center items-center min-h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-center h1-form text-gray-300 text-2xl mb-4">Registro</h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo Nombre */}
          <div className="relative mb-4">
            <label htmlFor="realName" className="text-gray-400">Nombre</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                id="realName"
                type="text"
                {...register("realName", { required: true })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Nombre"
              />
            </div>
            {errors.realName && (
              <p className="text-red-500 text-sm">El nombre real es requerido</p>
            )}
          </div>

          {/* Campo Apellido */}
          <div className="relative mb-4">
            <label htmlFor="lastName" className="text-gray-400">Apellido</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                id="lastName"
                type="text"
                {...register("lastName", { required: true })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Apellido"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm">El apellido es requerido</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="relative mb-4">
            <label htmlFor="phoneNumber" className="text-gray-400">Número de teléfono</label>
            <div className="relative">
              <FaPhone className="absolute top-3 left-3 text-gray-400" />
              <input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber", { required: true })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Número de teléfono"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">El número de teléfono es requerido</p>
            )}
          </div>

          {/* Campo Palabra Secreta */}
          <div className="relative mb-4">
            <label htmlFor="secretQuestion" className="block text-gray-400 mb-1">
              Selecciona una pregunta de seguridad
            </label>
            <select
              id="secretQuestion"
              {...register("secretQuestion", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
            >
              <option value="">-- Selecciona una opción --</option>
              <option value="petName">¿Nombre de mi mascota?</option>
              <option value="birthCity">¿Ciudad donde nací?</option>
              <option value="favoriteFood">¿Comida favorita?</option>
              <option value="firstSchool">¿Nombre de mi primera escuela?</option>
              <option value="favoriteColor">¿Color favorito?</option>
            </select>
            {errors.secretQuestion && (
              <p className="text-red-500 text-sm">Selecciona una pregunta de seguridad</p>
            )}

            <label htmlFor="secretWord" className="block text-gray-400 mb-1">
              Respuesta
            </label>
            <div className="relative">
              <FaKey className="absolute top-3 left-3 text-gray-400" />
              <input
                id="secretWord"
                type="text"
                {...register("secretWord", { required: true })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Ingrese su respuesta"
              />
            </div>
            {errors.secretWord && (
              <p className="text-red-500 text-sm">La respuesta es requerida</p>
            )}
          </div>

          {/* Campo Correo electrónico */}
          <div className="relative mb-4">
            <label htmlFor="email" className="text-gray-400">Correo electrónico</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Correo electrónico"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">El correo es requerido</p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="relative mb-4">
            <label htmlFor="password" className="text-gray-400">Contraseña</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Contraseña"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">La contraseña es requerida</p>
            )}
          </div>

          {/* Campo Confirmar contraseña */}
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="text-gray-400">Confirmar contraseña</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") || "Las contraseñas no coinciden",
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Confirmar contraseña"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white tasks" key={i}>
              {error}
            </div>
          ))}
          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
            >
              Registrar
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline hover:text-blue-600 transition"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
