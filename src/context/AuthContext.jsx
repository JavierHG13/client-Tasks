import { createContext, useState, useContext,useEffect} from "react";
import { registerRequest, loginRequest,verifyTokenRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export const AuthContext= createContext()

export const useAuth=()=>{

    const context=useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within an AuthPrivider")
    }
    return context
}

export const AuthProvider=({children})=>{

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors,setErrors] = useState([])
    const [loading,setLoading]= useState(true)
    const navigate = useNavigate()

    const signup = async (user) =>{
        try {
            console.log("Formulario enviado con valores:", user);
            const res = await registerRequest(user);
            console.log(res.data);
            //setUser(res.data)
            //setIsAuthenticated(true)
            alert(res.data[0])
            
            navigate("/login")

          } catch (error) {
            //console.error("Error al registrar el usuario:", error.response);
            setErrors(error.response.data)
          }
    }

    const signin = async(user)=>{
        try {
            const res= await loginRequest(user)
            
            setIsAuthenticated(true) 
            setUser(res.data)
        } catch (error) {

            console.log(error.response.data)

            alert(error.response.data[0])
        }
    }

    const logout =()=>{
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(()=>{
        if(errors.length>0){
            const timer=setTimeout(() => {
                setErrors([])
                }, 5000);
                return ()=>clearTimeout(timer)
        }
    },[errors])

    useEffect(()=>{
       async function checkLogin(){

        const cookies = Cookies.get()

        if(!cookies.token){
            setIsAuthenticated(false)
            setLoading(false)
            return setUser(null) 
        }
            try {
                const res= await verifyTokenRequest(cookies.token)
                if(!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
       checkLogin()
    },[])

    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}