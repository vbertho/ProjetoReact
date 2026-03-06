import { Plus, Minus } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { useState } from "react";

function ProductsAvailable() {
    const { items, fetchProducts } = useProducts();
    const { createSale } = useSales();

    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);

    function changeQuantity(item, delta) {
        setCart(prev => {
            const current = prev[item.id] || 0;
            const next = current + delta;

            if (next <= 0) {
                const copy = { ...prev };
                delete copy[item.id];
                return copy;
            }

            if (next > item.quantity) return prev;

            return { ...prev, [item.id]: next };
        });
    }

    async function finishSale() {
        const products = Object.entries(cart).map(([id, quantity]) => ({
            productId: Number(id),
            quantity
        }));

        if (products.length === 0) return;

        setLoading(true);

        try {
            await createSale({
                saleDate: new Date().toLocaleDateString("sv-SE"),
                products
            });

            clearCart();
            fetchProducts();
        } finally {
            setLoading(false);
        }
    }

    function clearCart() {
        setCart({});
    }

    const selectedItems = Object.keys(cart).length > 0;

    return (
        <div className="space-y-4">

            {/* Produtos */}
            <ul className="space-y-4 p-6 bg-neutral-300 rounded-md shadow">
                {items.filter(i => i.quantity > 0).map(item => {
                    const selected = cart[item.id] || 0;

                    return (
                        <li key={item.id} className="flex gap-2">
                            <span className="bg-neutral-500 text-white p-2 rounded-md flex items-center justify-center min-w-[40px]">
                                {item.quantity}
                            </span>

                            <span
                                className={`bg-neutral-500 text-left w-full text-white p-2 rounded-md ${item.quantity === 0 ? "opacity-50 line-through" : ""}`}>
                                {item.name}
                            </span>

                            <button
                                onClick={() => changeQuantity(item, -1)}
                                className="bg-neutral-500 text-white p-2 rounded-md"
                            >
                                <Minus />
                            </button>

                            <button
                                onClick={() => changeQuantity(item, 1)}
                                className="bg-neutral-500 text-white p-2 rounded-md"
                            >
                                <Plus />
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Resumo */}
            {selectedItems && (
                <div className="p-4 bg-neutral-200 rounded-md shadow space-y-2">
                    <h3 className="font-bold text-neutral-800">
                        Resumo da venda
                    </h3>

                    <ul>
                        {Object.entries(cart).map(([id, quantity]) => {
                            const product = items.find(p => p.id === Number(id));
                            return (
                                <li key={id}>
                                    {product?.name}: {quantity}
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex gap-2">
                        <button
                            onClick={clearCart}
                            className="w-full bg-red-500 text-white p-2 rounded-md"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={finishSale}
                            disabled={loading}
                            className="w-full bg-green-600 text-white p-2 rounded-md"
                        >
                            {loading ? "Processando..." : "Finalizar venda"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsAvailable;