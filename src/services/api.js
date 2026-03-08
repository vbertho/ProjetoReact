import axios from "axios";

const api = axios.create({
    baseURL: "https://cookiehub.onrender.com",
});

// sends the token automatically in every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
});

// redirects to login if the token is expired or invalid
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;