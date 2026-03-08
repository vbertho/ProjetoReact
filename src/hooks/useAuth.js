import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function useAuth() {
    const navigate = useNavigate();

    async function login(email, password) {
        const response = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
        navigate("/");
    }

    async function register(email, password) {
        const response = await api.post("/auth/register", { email, password });
        localStorage.setItem("token", response.data.token);
        navigate("/");
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    return { login, register, logout, isAuthenticated };
}