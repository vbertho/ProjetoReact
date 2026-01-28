import { Plus, Minus } from "lucide-react";

function ProductsAvailable({ products, onIncreaseClick, onDecreaseClick }) {
    return (
        <ul className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
            {products.map((product) => ( 
                <li key={product.id} className="flex gap-2">

                    {/* EXIBIDOR DE QUANTIDADE */}
                    <label className="bg-neutral-500 text-white p-2 rounded-md flex items-center justify-center min-w-[40px]">
                        {product.quantity}
                    </label>

                    {/* NOME DO PRODUTO */}
                    <label 
                        className={`bg-neutral-500 text-left w-full text-white p-2 rounded-md ${
                        product.isOutOfStock ? "opacity-50 line-through" : ""
                    }`}>
                        {product.name}
                    </label>

                    {/* INCREMENTAR */}
                    <button 
                        onClick={() => onIncreaseClick(product.id)} 
                        className="bg-neutral-500 text-white p-2 rounded-md">
                        <Plus />
                    </button>

                    {/* DECREMENTAR */}
                    <button 
                        onClick={() => onDecreaseClick(product.id)} 
                        className="bg-neutral-500 text-white p-2 rounded-md"
                        disabled={product.quantity === 0}
                    >
                        <Minus />
                    </button>
                </li>
             ))}
        </ul>
    )
}

export default ProductsAvailable;