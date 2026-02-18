import { Plus, Minus } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";


function ProductsAvailable() {
    const { items, updateQuantity } = useProducts();
    const [initialIds, setInitialIds] = useState(null);

    useEffect(() => {
        if (initialIds === null && items.length > 0) {
            setInitialIds(
                items
                    .filter(item => item.quantity > 0)
                    .map(item => item.id)
            )
        }
    }, [items]);

    const visibleItems = items.filter(item => initialIds?.includes(item.id));

    return (
        <ul className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
            {visibleItems.map((item) => (
                <li key={item.id} className="flex gap-2">

                    {/* EXIBIDOR DE QUANTIDADE */}
                    <span className="bg-neutral-500 text-white p-2 rounded-md flex items-center justify-center min-w-[40px]">
                        {item.quantity}
                    </span>

                    {/* NOME DO PRODUTO */}
                    <span
                        className={`bg-neutral-500 text-left w-full text-white p-2 rounded-md ${item.quantity === 0 ? "opacity-50 line-through" : ""
                            }`}
                    >
                        {item.name}
                    </span>

                    {/* DECREMENTAR */}
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-neutral-500 text-white p-2 rounded-md"
                    >
                        <Minus />
                    </button>

                    {/* INCREMENTAR */}
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-neutral-500 text-white p-2 rounded-md"
                    >
                        <Plus />
                    </button>

                </li>
            ))}
        </ul>
    );
}

export default ProductsAvailable;