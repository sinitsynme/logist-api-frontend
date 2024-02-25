import axios from "axios";

let logapiAxios = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  }
});

logapiAxios.interceptors.request.use((request) => {
  let jwtPair = JSON.parse(localStorage.getItem("user")).jwtPair
  if (jwtPair != null) {
    request.headers.Authorization = `Bearer ${jwtPair.accessToken}`
  }

  //add refresh token logic

  return request
})

export default logapiAxios;
