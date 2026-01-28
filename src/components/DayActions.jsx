import { useNavigate } from "react-router-dom";
function DayActions() {
    const navigate = useNavigate();
    return (
        <div className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
            <button onClick={() => navigate("/listproducts")} className="
                w-full               
                bg-green-600        
                hover:bg-green-700   
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
                Registrar Estoque
            </button>
            <button onClick={() => navigate("/report")} className="
                w-full               
                bg-blue-600        
                hover:bg-blue-700   
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
                Gerar Relatório
            </button>
        </div>
    )
}

export default DayActions;