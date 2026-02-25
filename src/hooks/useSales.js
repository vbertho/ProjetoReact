import { useState } from "react";
import api from "../services/api";

export function useSales() {
    const [sale, setSale] = useState(null);

    async function createSale(saleData) {
        try {
            const response = await api.post("/sales", saleData);
            setSale(response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating sale", error);
        }
    }

    return { sale, createSale };
}