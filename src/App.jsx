import DayActions from "./components/DayActions";
import ProductsAvailable from "./components/ProductsAvailable";
import "./App.css"

function App() {
    return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-[500px] space-y-6">
                <h1 className="text-3xl text-neutral-100 font-bold text-center">
                    Cookies do Dia
                </h1>
                <ProductsAvailable />
                <DayActions />
            </div>
        </div>
    )
}

export default App;