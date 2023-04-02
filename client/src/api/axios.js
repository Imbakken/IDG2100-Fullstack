//Directly inspired by Carlos's lecture number 15 and repository  idg2100-ntnu-movies-front-end

import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "https://idg2100-fullstack-exam.onrender.com",
});

export default axiosInstance;
