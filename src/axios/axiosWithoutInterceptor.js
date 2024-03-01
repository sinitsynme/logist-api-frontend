import axios from "axios";

let axiosWithoutInterceptor = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-type": "application/json",
    }
});

export default axiosWithoutInterceptor;