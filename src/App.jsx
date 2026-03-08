import DayActions from "./components/DayActions";
import ProductsAvailable from "./components/ProductsAvailable";
import { useAuth } from "./hooks/useAuth";
import { LogOut } from "lucide-react";
import "./App.css"

function App() {
    const { logout } = useAuth();

    return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-[500px] space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1" />
                    <h1 className="text-3xl text-neutral-100 font-bold text-center">
                        Cookies do Dia
                    </h1>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={logout}
                            className="text-gray-500 hover:text-white transition duration-200"
                            title="Sair"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
                <ProductsAvailable />
                <DayActions />
            </div>
        </div>
    )
}

export default App;