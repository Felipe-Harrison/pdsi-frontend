import axios from "axios";

const BaseUrl = "http://ec2-3-89-242-200.compute-1.amazonaws.com/";
// prod "http://ec2-3-89-242-200.compute-1.amazonaws.com/";
// local "http://localhost:8081";

const api = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;