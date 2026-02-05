import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function DayActions() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [actionType, setActionType] = useState(null);

    const confirmMessages = {
        stock: {
            title: "Registrar Estoque",
            message:
                "Essa ação permitirá adicionar ou atualizar os produtos disponíveis. Deseja continuar? ",
        },
        report: {
            title: "Gerar Relatório",
            message:
                "Essa ação finalizará o dia e o histórico de vendas atual será apagado. Deseja continuar?",
        },
    };

    function handleRegisterStock() {
        setActionType("stock");
        setShowConfirm(true);
    }

    function handleGenerateReport() {
        setActionType("report")
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
                <button onClick={handleRegisterStock} className="
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
                    Gerar Relatório
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