import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function AuthPage({ mode }) {
    const isLogin = mode === "login";
    const { login, register } = useAuth();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    async function handleSubmit() {
        setError("");

        if (!isLogin && password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
            }
        } catch (err) {
            const status = err.response?.status;
            const field = err.response?.data?.field;
            console.log("field:", field);

            if (status === 400 && field === "password") setError("Senha muito curta");
            else if (status === 400 && field === "email") setError("Email inválido");
            else if (status === 400) setError("Dados inválidos")
            else if (status === 409) setError("Este email já está cadastrado");
            else setError(isLogin ? "Email ou senha incorretos" : "Erro ao cadastrar, tente novamente");
        }
    }

    return (
        <div className="w-screen h-screen bg-neutral-900 flex justify-center p-6">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl text-neutral-100 font-bold text-center">
                    {isLogin ? "Login" : "Cadastro"}
                </h1>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md px-4 focus-within:border-white focus-within:border-2">
                        <Mail className="text-gray-400 mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="bg-transparent w-full py-4 focus:outline-none text-white"
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-md px-4 focus-within:border-white focus-within:border-2">
                        <Lock className="text-gray-400 mr-2" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-transparent w-full py-4 focus:outline-none text-white"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
                        </button>
                    </div>

                    {!isLogin && (
                        <div className="flex items-center border border-gray-300 rounded-md px-4 focus-within:border-white focus-within:border-2">
                            <Lock className="text-gray-400 mr-2" size={20} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmar senha"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="bg-transparent w-full py-4 focus:outline-none text-white"
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
                            </button>
                        </div>
                    )}

                    {!isLogin && (
                        <p className="text-gray-500 text-xs">A senha deve ter no mínimo 8 caracteres</p>
                    )}
                </div>

                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={!email || !password || (!isLogin && !confirmPassword)}
                    className="
                        w-full
                        bg-white
                        hover:bg-gray-200
                        disabled:cursor-not-allowed
                        disabled:bg-gray-500
                        text-neutral-900
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
                    {isLogin ? "Entrar" : "Cadastrar"}
                </button>

                <p className="text-center text-gray-400 text-sm">
                    {isLogin ? (
                        <>
                            Não tem conta?{" "}
                            <Link to="/register" className="text-white underline">
                                Cadastrar
                            </Link>
                        </>
                    ) : (
                        <>
                            Já tem conta?{" "}
                            <Link to="/login" className="text-white underline">
                                Entrar
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </div >
    )
}

export default AuthPage;