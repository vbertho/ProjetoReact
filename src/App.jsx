import DayActions from "./components/DayActions";
import ProductsAvailable from "./components/ProductsAvailable";
import { useState } from "react";
import "./App.css"

function App() {
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem("products")) || []
    );

    function onIncreaseClick(productId) {
        setProducts(products.map(product => 
            product.id === productId 
                ? { ...product, quantity: product.quantity + 1, isOutOfStock: false } 
                : product
        ));
    }

    function onDecreaseClick(productId) {
        setProducts(products.map(product => {
            if (product.id === productId && product.quantity > 0) {
                const newQuantity = product.quantity - 1;
                return { ...product, quantity: newQuantity, isOutOfStock: newQuantity === 0 };
            }
            return product;
        }));
    }

   return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-[500px] space-y-6">
            <h1 className="text-3xl text-neutral-100 font-bold text-center">
                Cookies do Dia 
            </h1>
            {products.length > 0 && (
            <ProductsAvailable 
                products={products}
                onIncreaseClick={onIncreaseClick}
                onDecreaseClick={onDecreaseClick} 
            />
            )}
            <DayActions />
            </div>
        </div>
    )
}

export default App;