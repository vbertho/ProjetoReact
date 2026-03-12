import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useProducts } from "../hooks/useProducts";

function DayActions() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [actionType, setActionType] = useState(null);
    const { items } = useProducts();

    const confirmMessages = {
        stock: {
            title: "Editar Estoque",
            message:
                "Essa ação permitirá adicionar ou editar os produtos disponíveis. Deseja continuar?",
        },
        report: {
            title: "Visualizar Relatório",
            message:
                "Essa ação exibirá o resumo das vendas realizadas. Deseja continuar?",
        }
    };

    function handleEditStock() {
        // se não houver produtos, navega direto
        if (items.every(item => item.quantity === 0)) {
            navigate("/stock")
            return;
        }
        // se houver produtos, mostra o modal de confirmação
        setActionType("stock");
        setShowConfirm(true);
    }

    function handleGenerateReport() {
        setActionType("report");
        setShowConfirm(true);
    }

    function handleConfirm() {
        if (actionType === "stock") {
            navigate("/stock");
        }

        if (actionType === "report") {
            navigate("/report");
        }

        setShowConfirm(false);
    }

    function handleCancel() {
        setShowConfirm(false);
    }

    return (
        <>
            <div className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
                <button onClick={handleEditStock} className="
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
                    Editar Estoque
                </button>
                <button onClick={handleGenerateReport} className="
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
                    Visualizar Relatório
                </button>
                <button onClick={() => navigate("/management")} className="
                w-full               
                bg-orange-600        
                hover:bg-orange-700   
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
                    Cadastrar Produto
                </button>
            </div>

            {showConfirm && actionType && (
                <ConfirmModal
                    title={confirmMessages[actionType].title}
                    message={confirmMessages[actionType].message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
}

export default DayActions;