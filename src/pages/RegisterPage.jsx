import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { signup, errors: registerErrors } = useAuth();

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
                {...register("realName", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 2,
                    message: "El nombre real debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El nombre real no debe superar los 50 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "El nombre real solo puede contener letras y espacios",
                  },
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Nombre"
              />
            </div>
            {errors.realName && (
              <p className="text-red-500 text-sm">{errors.realName.message}</p>
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
                {...register("lastName", {
                  required: "El apellido es requerido",
                  minLength: {
                    value: 2,
                    message: "El apellido debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El apellido no debe superar los 50 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "El apellido solo puede contener letras y espacios",
                  },
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Apellido"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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
                {...register("phoneNumber", {
                  required: "El número de teléfono es requerido",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "El número de teléfono debe contener exactamente 10 dígitos",
                  },
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Número de teléfono"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
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
                {...register("email", {
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido",
                  },
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Correo electrónico"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="relative mb-4">
            <label htmlFor="password" className="text-gray-400">Contraseña</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)",
                  },
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-3 right-3 text-gray-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Campo Confirmar contraseña */}
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="text-gray-400">Confirmar contraseña</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (value) =>
                    value === getValues("password") || "Las contraseñas no coinciden",
                })}
                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md"
                placeholder="Confirmar contraseña"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-3 right-3 text-gray-400 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Errores generales del servidor */}
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