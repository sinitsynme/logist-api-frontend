import axios from "axios";
import {useAuthStore} from "@/auth/authStore";

let logapiAxios = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  }
});

logapiAxios.interceptors.request.use((request) => {
  let jwtPair = useAuthStore().jwtPair
  if (jwtPair != null) {
    request.headers.Authorization = `Bearer ${jwtPair.accessToken}`
  }

  //add refresh token logic

  return request
})

export default logapiAxios;
