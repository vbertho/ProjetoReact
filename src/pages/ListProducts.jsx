import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

function ListProducts() {
    const navigate = useNavigate()

    const catalogo = [
        { id: 1, name: "Oreo com Nutella", price: 9.5 },
        { id: 2, name: "Nutella", price: 9 },
        { id: 3, name: "KitKat", price: 9.5 },
        { id: 4, name: "Doce de Leite", price: 8.5 },
        { id: 5, name: "Clássico", price: 6.5 },
        { id: 6, name: "Chocolate", price: 6.5 },
    ];

    const [items, setItems] = useState(() => {
        const currentStock = JSON.parse(localStorage.getItem("products")) || [];

        return catalogo.map(item => {
            const stockItem = currentStock.find(p => p.id === item.id);

            if (stockItem && stockItem.quantity > 0) {
                return {
                    ...item,
                    quantity: stockItem.quantity,
                    checked: true,
                };
            }

            return {
                ...item,
                quantity: 0,
                checked: false,
            };
        });
    });

    function toggleItem(id) {
        const newItems = items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: !item.checked,
                    quantity: !item.checked ? 1 : 0
                };
            }
            return item;
        });
        setItems(newItems);
    }

    function onIncreaseClick(id) {
        const newItems = items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                    checked: true,
                };
            }
            return item;
        });
        setItems(newItems);
    }

    function onDecreaseClick(id) {
        const newItems = items.map(item => {
            if (item.id === id && item.quantity > 0) {
                const newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity,
                    checked: newQuantity > 0,
                };
            }
            return item;
        });
        setItems(newItems);
    }

    function handleFillStock() {
        const selectedItems = items
            .filter(item => item.quantity > 0)
            .map(item => ({
                ...item,
                isOutOfStock: false,
            }));

        localStorage.setItem("products", JSON.stringify(selectedItems));
        navigate(-1);
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
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${item.checked ? "bg-neutral-200" : "bg-neutral-300 opacity-50"}`}
                            onClick={() => toggleItem(item.id)}>

                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleItem(item.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-5 h-5 accent-green-600"
                            />
                            <span className={item.checked ? "text-black" : "opacity-50"}>
                                {item.name}
                            </span>

                            {item.checked && (
                                <div className="flex items-center gap-4 ml-auto">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onIncreaseClick(item.id)
                                        }}
                                        className="bg-neutral-500 text-white p-1 rounded">
                                        <Plus size={16} />
                                    </button>
                                    <span
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-6 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDecreaseClick(item.id)
                                        }}
                                        className="bg-neutral-500 text-white p-1 rounded">
                                        <Minus size={16} />
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="text-neutral-100 font-semibold">
                    Total selecionado: {totalSelected} unidades
                </div>

                <button onClick={handleFillStock} className="
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