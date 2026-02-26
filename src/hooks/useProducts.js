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
            await api.patch(`/products/${id}/updateQuantity`, { quantity: value });
        } catch {
            fetchProducts();
        }
    }

    async function createProduct(data) {
        try {
            const response = await api.post("/products", data);
            setItems(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Error creating product", error);
        }
    }

    async function deleteProduct(id) {
        try {
            await api.delete(`/products/${id}`);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
        }
    }

    async function updateProduct(id, data) {
        try {
            const response = await api.put(`/products/${id}`, data);
            setItems(prev => prev.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error("Error updating product", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return { items, updateQuantity, deleteProduct, createProduct, updateProduct, fetchProducts };
}