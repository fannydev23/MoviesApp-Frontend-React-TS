import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const moviesAPI = axios.create({
    baseURL: VITE_API_URL
})

//Configure interceptors

export default moviesAPI;