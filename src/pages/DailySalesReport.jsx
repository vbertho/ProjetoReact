import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

function DailySalesReport() {
    const navigate = useNavigate()

    const initialStock = JSON.parse(localStorage.getItem("initialStock")) || [];
    const finalStock = JSON.parse(localStorage.getItem("products")) || [];

    const sales = initialStock.map(initialItem => {
        //procura no finalStock o mesmo produto do initialStock
        const finalItem = finalStock.find(f => f.id === initialItem.id);

        const finalQty = finalItem ? finalItem.quantity : 0;

        //vendido = inicial - final
        const soldQty = initialItem.quantity - finalQty;

        return {
            ...initialItem,
            soldQuantity: soldQty > 0 ? soldQty : 0,
            remainingQty: finalQty > 0 ? finalQty : 0,
        };
    });

    // Total de unidades vendidas
    const totalUnits = sales.reduce((sum, item) => sum + item.soldQuantity, 0);

    // Total faturado
    const totalSold = sales.reduce((sum, item) => sum + item.soldQuantity * item.price, 0);

    return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl text-neutral-100 font-bold text-center">
                    Relatório de Vendas
                </h1>

                <div className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
                    <div className="font-semibold text-neutral-900">
                        Faturamento:
                        <span className="text-blue-600 ml-2">
                            R$ {totalSold.toFixed(2)}
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Total Vendido:
                        <span className="text-blue-600 ml-2">
                            {totalUnits} Cookies
                        </span>
                    </div>

                    <div className="font-semibold text-neutral-900">
                        Os Cookies Vendidos Foram:
                    </div>

                    <ul className="space-y-2">
                        {sales
                            .filter(item => item.soldQuantity > 0)
                            .map(item => (
                                <li key={item.id} className="flex items-center gap-2 p-3 bg-neutral-200 rounded-md">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                                        {item.soldQuantity}
                                    </span>
                                    <span>
                                        {item.name}
                                    </span>
                                </li>
                            ))}
                    </ul>

                    <div className="font-semibold text-neutral-900">
                        Os Cookies Restantes Foram:
                    </div>

                    <ul className="space-y-2">
                        {sales
                            .filter(item => item.remainingQty > 0)
                            .map(item => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-2 p-3 bg-neutral-200 rounded-md"
                                >
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                                        {item.remainingQty}
                                    </span>
                                    <span>{item.name}</span>
                                </li>
                            ))}
                    </ul>

                </div>
                <button onClick={() => {
                    const remainingProducts = sales
                        .filter(item => item.remainingQty > 0)
                        .map(item => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.remainingQty,
                            checked: true,
                        }));

                    localStorage.setItem("products", JSON.stringify(remainingProducts));
                    localStorage.setItem("initialStock", JSON.stringify(remainingProducts));

                    navigate(-1);
                }}
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

export default DailySalesReport;