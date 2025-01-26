import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa"; // Importar íconos adicionales

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidToken, setIsValidToken] = useState(false); // Para manejar el estado del token
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`https://api-tasks-wtel.vercel.app/api/verifyToken/${token}`);
                //const data = await response.json();

                if (response.ok) {

                    setIsValidToken(true);
                }

            } catch (error) {
                console.error('Error verificando el token:', error);
                alert('Hubo un problema al verificar el token.');
                //navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('https://api-tasks-wtel.vercel.app/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
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
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="relative mb-4">
                            <FaLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Escriba la nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-700 text-white tasks px-10 py-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative mb-4">
                            <FaLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Confirmar la nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-zinc-700 text-white tasks px-10 py-2 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                            />
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
