import { useEffect, useState } from "react";
import api from "../services/api";

export function useReport() {
    const [report, setReport] = useState({
        totalQuantity: 0,
        unitsByProduct: [],
        bestSelling: [],
        totalAmount: 0,
        availableStock: []
    });

    async function fetchReport(start, end) {
        try {
            const [totalQuantity, unitsByProduct, bestSelling, totalAmount, availableStock] = await Promise.all([
                api.get(`/report/totalQuantity?start=${start}&end=${end}`),
                api.get(`/report/unitsByProduct?start=${start}&end=${end}`),
                api.get(`/report/bestSelling?start=${start}&end=${end}`),
                api.get(`/report/totalAmount?start=${start}&end=${end}`),
                api.get("/report/availableStock"),
            ]);

            setReport({
                totalQuantity: totalQuantity.data,
                unitsByProduct: unitsByProduct.data,
                bestSelling: bestSelling.data,
                totalAmount: totalAmount.data,
                availableStock: availableStock.data,
            });
        } catch (error) {
            console.error("Error fetching report", error);
        }
    }
    return { report, fetchReport };
}