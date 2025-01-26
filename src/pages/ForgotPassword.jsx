import { useState } from 'react';
import { FaEnvelope } from "react-icons/fa"; // Importar íconos adicionales

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    //const [secretWord, setSecretWord] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Por favor, ingresa un correo válido.');
            return;
        }

        try {
            const response = await fetch('https://api-tasks-wtel.vercel.app/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                //setIsEmailValid(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al enviar la solicitud.');
        }
    };

    /*const handleKeywordSubmit = async (e) => {
        e.preventDefault();

        if (!secretWord) {
            alert('Por favor, ingresa la palabra secreta.');
            return;
        }

        try {
            const response = await fetch('https://api-tasks-wtel.vercel.app/api/verify-keyword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, secretWord }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message || 'Hubo un problema al verificar la palabra secreta.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al verificar la palabra secreta.');
        }
    };*/

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-center h1-form text-gray-300 text-2xl mb-4">
                    Recuperación de contraseña
                </h1>
                <br />

                <form onSubmit={handleEmailSubmit} className="w-full">
                    <div className="relative mb-4">
                        <label htmlFor="email" className="block text-gray-400 mb-1">
                            Ingrese su correo electrónico
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Ingrese su correo electrónico"
                                value={email}
                                className="w-full bg-zinc-700 text-white px-10 py-2 rounded-md mb-4 focus:ring-blue-500 focus:ring 'opacity-50 cursor-pointer"
                            
                                onChange={(e) => setEmail(e.target.value)}
                                //disabled={isEmailValid}
                            />
                        </div>
                    </div>



                    <button
                        type="submit"
                        className="w-full bg-blue-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Enviar
                    </button>
                </form>

                {/*isEmailValid && (
                    <form onSubmit={handleKeywordSubmit} className="w-full">
                        <div className="relative mb-4">
                            <FaKey className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Ingresa la palabra secreta"
                                value={secretWord}
                                className="w-full bg-zinc-700 text-white tasks px-10 py-2  rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                                onChange={(e) => setSecretWord(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Verificar
                        </button>
                    </form>
                )*/}
            </div>
        </div>
    );
};

export default ForgotPassword;
