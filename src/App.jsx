import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext.jsx';         
import RegisterPage from './pages/RegisterPage.jsx';             
import LoginPage from './pages/LoginPage.jsx';                   
import TasksPage from './pages/TasksPage.jsx';                   
import TasksFormPage from './pages/TasksFormPage.jsx';           
import ProfilePage from './pages/ProfilePage.jsx';               
import HomePage from './pages/HomePage.jsx';       
import ForgotPassword from './pages/ForgotPassword.jsx';          
import ResetPassword from './pages/ResetPassword.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';              
import { TaskProvider } from './context/TasksContext.jsx';       
import Navbar from './components/Navbar.jsx';                    

function App() {
  return (
    <BrowserRouter> {/* Navegador para manejar rutas */}
      <AuthProvider> 
        <TaskProvider>
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
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
