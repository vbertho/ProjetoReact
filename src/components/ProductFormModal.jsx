import { useState } from "react";

function ProductFormModal({ initialData, onConfirm, onCancel }) {
    const [name, setName] = useState(initialData?.name || "");
    const [price, setPrice] = useState(initialData?.price || "");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-md rounded-xl bg-neutral-100 p-6 shadow-2xl animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="border-b pb-4 mb-4 text-2xl font-bold text-neutral-900">
                    {initialData ? "Editar Produto" : "Novo Produto"}
                </h2>

                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-neutral-700">Nome</label>
                        <input
                            type="text"
                            placeholder="Ex: Chocolate"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-neutral-700">Preço</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        autoFocus
                        className="
                            w-full
                            px-5 py-2 rounded-lg
                            bg-neutral-300 text-neutral-800
                            hover:bg-neutral-400
                            transition
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={() => onConfirm({ name, price })}
                        className="
                            w-full
                                px-5 py-2 rounded-lg
                                bg-green-600 text-white
                                hover:bg-green-700
                                shadow-md hover:shadow-lg
                                transition
                            "
                    >
                        Confirmar
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProductFormModal;