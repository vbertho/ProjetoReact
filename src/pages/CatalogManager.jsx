import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductFormModal from "../components/ProductFormModal";
import { useState } from "react";

function ProductManager() {
    const navigate = useNavigate();
    const { items, deleteProduct, createProduct, updateProduct } = useProducts();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl text-neutral-100 font-bold text-center mb-10">
                    Gerenciamento do Catálago
                </h1>
                <div className="flex justify-between items-center">
                    <h2 className="text-neutral-100 text-xl font-semibold">
                        Produtos
                    </h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="
                            bg-green-600 
                            hover:bg-green-700 
                            text-neutral-900 
                            px-4 
                            py-2 
                            rounded-lg 
                            font-semibold 
                            transition 
                            duration-200
                            ease-in-out 
                        ">
                        + Adicionar
                    </button>
                </div>
                <ul className="space-y-4 p-6 bg-neutral-300 rounded-md shadow bg">
                    {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between gap-2 p-3 rounded-md bg-neutral-200">
                            <span className="text-black">
                                {item.name}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedProduct(item);
                                        setShowModal(true);
                                    }}
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                >
                                    <Pencil />
                                </button>

                                <button
                                    onClick={() => deleteProduct(item.id)}
                                    className="bg-red-500 text-white p-2 rounded-md"
                                >
                                    <Trash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={() => navigate(-1)} className="
                w-full               
                bg-red-600        
                hover:bg-red-700   
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
                    Voltar
                </button>
            </div>
            {showModal && (
                <ProductFormModal
                    initialData={selectedProduct}
                    onConfirm={(data) => {
                        if (selectedProduct) {
                            updateProduct(selectedProduct.id, data);
                        } else {
                            createProduct(data);
                        }
                        setSelectedProduct(null);
                        setShowModal(false);
                    }}
                    onCancel={() => {
                        setSelectedProduct(null);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    )
}

export default ProductManager;