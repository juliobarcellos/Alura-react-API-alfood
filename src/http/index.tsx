import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000/api/v2/'
    //baseURL: 'http://192.168.100.103:8000/api/v2/'
})

export default http;