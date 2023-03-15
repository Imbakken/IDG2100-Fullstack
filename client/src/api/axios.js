//Directly inspired by Carlos's lecture number 15 and repository  idg2100-ntnu-movies-front-end

import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export default axiosInstance;
