import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "https://idg2100-fullstack-exam.onrender.com",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // handle errors here
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
