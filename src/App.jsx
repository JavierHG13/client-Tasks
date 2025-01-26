/* Este archivo define la estructura principal de la aplicación frontend utilizando React. 
   Configura las rutas de la aplicación, los contextos de autenticación y tareas, y un sistema de rutas protegidas. */

   import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar componentes para manejar rutas
   import { AuthProvider } from './context/AuthContext.jsx';         // Proveedor de contexto de autenticación
   import RegisterPage from './pages/RegisterPage.jsx';             // Página de registro
   import LoginPage from './pages/LoginPage.jsx';                   // Página de inicio de sesión
   import TasksPage from './pages/TasksPage.jsx';                   // Página de tareas
   import TasksFormPage from './pages/TasksFormPage.jsx';           // Página para añadir/editar tareas
   import ProfilePage from './pages/ProfilePage.jsx';               // Página de perfil del usuario
   import HomePage from './pages/HomePage.jsx';       
   import ForgotPassword from './pages/ForgotPassword.jsx';          //
   import ResetPassword from './pages/ResetPassword.jsx';
   import ProtectedRoute from './ProtectedRoute.jsx';               // Ruta protegida
   import { TaskProvider } from './context/TasksContext.jsx';       // Proveedor de contexto de tareas
   import Navbar from './components/Navbar.jsx';                    // Barra de navegación
   
   function App() {
     return (
       <AuthProvider> 
         <TaskProvider>
           <BrowserRouter> {/* Navegador para manejar rutas */}
             <main className="container mx-auto px-10"> {/* Contenedor principal con estilos de Tailwind */}
               <Navbar /> {/* Barra de navegación */}
               <Routes>
                 {/* Rutas públicas */}
                 <Route path="/" element={<HomePage />} />
                 <Route path="/login" element={<LoginPage />} />
                 <Route path="/register" element={<RegisterPage />} />
                 <Route path="/forgot-password" element={<ForgotPassword />} />
                 <Route path='/reset-password/:token' element={<ResetPassword />} />
   
                 {/* Rutas protegidas */}
                 <Route element={<ProtectedRoute />}>
      
                   <Route path="/tasks" element={<TasksPage />} />
                   <Route path="/add-task" element={<TasksFormPage />} />
                   <Route path="/tasks/:id" element={<TasksFormPage />} />
                   <Route path="/profile" element={<ProfilePage />} />
                 </Route>
               </Routes>
             </main>
           </BrowserRouter>
         </TaskProvider>
       </AuthProvider>
     );
   }
   
   export default App;
   