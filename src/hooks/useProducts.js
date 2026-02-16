import { useEffect, useState } from "react";
import api from "../services/api";

export function useProducts() {
    const [items, setItems] = useState([]);

    async function fetchProducts() {
        try {
            const response = await api.get("/products");
            setItems(response.data);
        } catch (error) {
            console.error("Error finding products", error);
        }
    }

    async function updateQuantity(id, value) {
        if (value < 0) return;

        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: value } : item
            )
        );

        try {
            await api.patch(`/products/${id}/updateQuantity?value=${value}`);
        } catch {
            fetchProducts();
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return { items, updateQuantity };
}