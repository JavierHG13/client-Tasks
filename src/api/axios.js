import axios from "axios";

const API = 'https://api-tasks-wtel.vercel.app/api'

//const API = 'http://localhost:3000/api'

const instance=axios.create({
    baseURL: API,
    withCredentials:true
})

export default instance 