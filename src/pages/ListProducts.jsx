import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import BottomSheet from "../components/BottomSheet"

function ListProducts() {
    const navigate = useNavigate()
    const { items, updateQuantity } = useProducts();


    const totalSelected = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl text-neutral-100 font-bold text-center">
                    Sabores Disponíveis
                </h1>
                <ul className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
                    {items.map(item => (
                        <li
                            key={item.id}
                            className={`flex items-center gap-2 p-3 rounded-md ${item.quantity > 0 ? "bg-neutral-200" : "bg-neutral-300"
                                }`}
                        >
                            <span className="text-black">
                                {item.name}
                            </span>

                            <BottomSheet
                                value={item.quantity}
                                onChange={(newQuantity) =>
                                    updateQuantity(item.id, newQuantity)
                                }
                            />
                        </li>
                    ))}
                </ul>

                <div className="text-neutral-100 font-semibold">
                    Total selecionado: {totalSelected} unidades
                </div>

                <button onClick={() => navigate(-1)} className="
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
                    Preencher Estoque
                </button>
            </div>
        </div>
    )
}

export default ListProducts;