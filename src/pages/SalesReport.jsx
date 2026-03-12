import { useNavigate } from "react-router-dom";
import { useReport } from "../hooks/useReport";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SalesReport() {
    const navigate = useNavigate()
    const { report: todayReport, fetchReport: fetchToday } = useReport();
    const { report: historyReport, fetchReport: fetchHistory } = useReport();
    const [mode, setMode] = useState("day");
    const [currentDate, setCurrentDate] = useState(new Date());

    function getDateRange() {
        if (mode === "day") {
            const d = currentDate.toLocaleDateString("sv-SE");
            return { start: d, end: d };
        }
        if (mode === "week") {
            const start = new Date(currentDate);
            start.setDate(currentDate.getDate() - currentDate.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return {
                start: start.toLocaleDateString("sv-SE"),
                end: end.toLocaleDateString("sv-SE"),
            };
        }
        if (mode === "month") {
            const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            return {
                start: start.toLocaleDateString("sv-SE"),
                end: end.toLocaleDateString("sv-SE"),
            };
        }
    }

    function getLabel() {
        if (mode === "day") return currentDate.toLocaleDateString("pt-BR");
        if (mode === "week") {
            const start = new Date(currentDate);
            start.setDate(currentDate.getDate() - currentDate.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${start.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} - ${end.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
        }
        if (mode === "month") return currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    }

    function navigate_prev() {
        const d = new Date(currentDate);
        if (mode === "day") d.setDate(d.getDate() - 1);
        if (mode === "week") d.setDate(d.getDate() - 7);
        if (mode === "month") d.setMonth(d.getMonth() - 1);
        setCurrentDate(d);
    }

    function navigate_next() {
        const d = new Date(currentDate);
        if (mode === "day") d.setDate(d.getDate() + 1);
        if (mode === "week") d.setDate(d.getDate() + 7);
        if (mode === "month") d.setMonth(d.getMonth() + 1);
        setCurrentDate(d);
    }

    useEffect(() => {
        const today = new Date().toLocaleDateString("sv-SE");
        fetchToday(today, today);
    }, []);

    useEffect(() => {
        const { start, end } = getDateRange();
        fetchHistory(start, end);
    }, [mode, currentDate]);

    return (
        <div className="w-screen min-h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl text-neutral-100 font-bold text-center">
                    Relatório de Vendas
                </h1>

                {/* Container 1 */}
                <div className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
                    <h2 className="text-lg font-bold text-neutral-800 border-b border-neutral-400 pb-2">
                        Resumo do Dia
                    </h2>
                    <div className="font-semibold text-neutral-900">
                        Faturamento:
                        <span className="text-blue-600 ml-2">
                            R$ {Number(todayReport.totalAmount).toFixed(2) ?? "0.00"}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Total Vendido:
                        <span className="text-blue-600 ml-2">
                            {todayReport.totalQuantity} {todayReport.totalQuantity === 1 ? "Cookie" : "Cookies"}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Mais vendido:
                        <span className="text-blue-600 ml-2">
                            {todayReport?.bestSelling}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Os Cookies Restantes Foram:
                    </div>

                    <ul className="space-y-2">
                        {historyReport.availableStock.map(item => (
                            <li key={item.id} className="flex items-center gap-2 p-3 bg-neutral-200 rounded-md">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                                    {item.quantity}
                                </span>
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Container 2 */}
                <div className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
                    <h2 className="text-lg font-bold text-neutral-800 border-b border-neutral-400 pb-2">
                        Histórico
                    </h2>

                    <div className="flex gap-2 justify-center">
                        {["day", "week", "month"].map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`px-4 py-2 rounded-lg font-semibold transition ${mode === m ? "bg-blue-600 text-white" : "bg-neutral-200 text-neutral-800 hover:bg-neutral-400"}`}
                            >
                                {m === "day" ? "Dia" : m === "week" ? "Semana" : "Mês"}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <button onClick={navigate_prev} className="text-neutral-800 p-1 hover:bg-neutral-400 rounded-lg transition">
                            <ChevronLeft />
                        </button>
                        <span className="font-semibold text-neutral-900">{getLabel()}</span>
                        <button onClick={navigate_next} className="text-neutral-800 p-1 hover:bg-neutral-400 rounded-lg transition">
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Faturamento:
                        <span className="text-blue-600 ml-2">
                            R$ {Number(historyReport.totalAmount)?.toFixed(2) ?? "0.00"}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Total Vendido:
                        <span className="text-blue-600 ml-2">
                            {historyReport.totalQuantity} {historyReport.totalQuantity === 1 ? "Cookie" : "Cookies"}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Mais vendido:
                        <span className="text-blue-600 ml-2">
                            {historyReport.bestSelling}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Os Cookies Vendidos Foram:
                    </div>

                    <ul className="space-y-2">
                        {historyReport.unitsByProduct.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 p-3 bg-neutral-200 rounded-md">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                                    {item[1]}
                                </span>
                                <span>
                                    {item[0]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={() => navigate(-1)}
                    className="
                    w-full               
                    bg-red-600        
                    hover:bg-red-700   
                    text-white         
                    text-xl            
                    font-semibold         
                    py-4                
                    rounded-lg         
                    shadow-md         
                    hover:shadow-lg      
                    transition            
                    duration-200         
                    ease-in-out          
                ">
                    Voltar
                </button>
            </div>
        </div>
    )
}

export default SalesReport;