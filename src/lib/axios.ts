import axios from "axios";

const baseURL = "https://tiao.supliu.com.br/api/";

const token = "guilhermelopes275@gmail.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: token,
  },
});

export default axiosInstance;
