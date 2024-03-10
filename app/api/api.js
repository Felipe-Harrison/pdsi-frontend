import axios from "axios";

const BaseUrl = process.env.NEXT_PUBLIC_ENVIROMENT == 'production' 
    ? "http://ec2-3-89-242-200.compute-1.amazonaws.com/" // prod
    : "http://localhost:8081" // local

const api = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;