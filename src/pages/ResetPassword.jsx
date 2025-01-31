import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa"; // Importar íconos adicionales
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    //const [password, setPassword] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');

    const [isValidToken, setIsValidToken] = useState(false); // Para manejar el estado del token
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const { register, handleSubmit, getValues, formState: { errors } } = useForm(); // Importar el hook useForm


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`https://api-tasks-wtel.vercel.app/api/verifyToken/${token}`);
                if (response.ok) {
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                }
            } catch (error) {
                console.error('Error verificando el token:', error);
                alert('Hubo un problema al verificar el token.');
            } finally {
                setLoading(false);
            }
        };
    
        verifyToken();

    }, [token]); //Aqui se pasa lo que se va ocupar en useEffcet
    

    const onSubmit = async (values) => {

        try {
            const response = await fetch('https://api-tasks-wtel.vercel.app/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: values.password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error restableciendo contraseña:', error);
            alert('Hubo un problema al restablecer tu contraseña.');
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">

            {isValidToken ? (
                <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                    <h1 className="text-center h1-form text-gray-300 text-2xl mb-4">Recuperación de contraseña</h1>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">

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


                        <button
                            type="submit"
                            className="w-full bg-blue-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Restablecer
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-gray-300 text-2xl">Token expirado o no válido</h2>
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 bg-blue-500 px-4 py-2 rounded text-white"
                    >
                        Volver al inicio de sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
