import axios from "axios";
import { ENVIRONMENT } from "../../local.environment";

const BASE_URL = ENVIRONMENT.baseURL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;