import axios from "axios";

const api = axios.create({
    baseURL: "https://cookiehub.onrender.com",
});

export default api;