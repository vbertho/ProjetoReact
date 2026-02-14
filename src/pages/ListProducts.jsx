import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import api from "../services/api";

function ListProducts() {
    const navigate = useNavigate()

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get("/products");
                setItems(response.data);
            } catch (error) {
                console.error("Error finding products", error);
            }
        }

        fetchProducts();
    }, []);

    async function updateQuantity(id, value) {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: value } : item
            )
        );

        try {
            await api.patch(`/products/${id}/updateQuantity?value=${value}`);
        } catch (error) {
            console.error("Erro ao atualizar quantidade", error);
            fetchProducts();
        }
    }


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
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${item.quantity > 0 ? "bg-neutral-200" : "bg-neutral-300 opacity-50"}`}
                        >
                            <input
                                type="checkbox"
                                checked={item.quantity > 0}
                                onChange={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity > 0 ? 0 : 1
                                    )
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-5 h-5 accent-green-600"
                            />
                            <span
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity > 0 ? 0 : 1
                                    )}
                                className={item.quantity > 0 ? "text-black" : "opacity-50"}>
                                {item.name}
                            </span>

                            {item.quantity > 0 && (
                                <div className="flex items-center gap-4 ml-auto">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateQuantity(item.id, item.quantity - 1);
                                        }}
                                        className="bg-neutral-500 text-white p-1 rounded">
                                        <Minus size={16} />
                                    </button>
                                    <span
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-6 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateQuantity(item.id, item.quantity + 1);
                                        }}
                                        className="bg-neutral-500 text-white p-1 rounded">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            )}
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