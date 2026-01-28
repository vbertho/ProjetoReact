import { useNavigate } from "react-router-dom";
function DailySalesReport() {
    const navigate = useNavigate()

    // Pega os produtos vendidos do localStorage
    const sales = JSON.parse(localStorage.getItem("products")) || [];

    // Total de unidades vendidas
    const totalUnits = sales.reduce((sum, item) => sum + item.quantity, 0);

    // Total faturado
    const totalSold = sales.reduce((sum, item) => sum + item.quantity * item.price, 0);

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
                        {sales.map(item => (
                        <li key={item.id} className="flex items-center gap-2 p-3 bg-neutral-200 rounded-md">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                                {item.quantity} 
                            </span>
                            <span>
                                {item.name}
                            </span>
                        </li>
                        ))}
                    </ul>
                </div>
                <button onClick={() => {
                    localStorage.removeItem("products");
                    navigate(-1)
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