'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from './actions'

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        console.log("handleSubmit")
        console.log('email', email)
        console.log('password', password)
        const result = await signIn(email, password);

        console.log('result', result)

        if (result?.error) {
            setError(result.error);
        }
        // Si no hay error, el Server Action redirige automáticamente

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md p-10 rounded-lg shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-serif font-bold mb-1">Panel Admin</h1>
                    <p className="text-sm text-gray-500">Biblioteca del Carnaval Montevideano</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                            placeholder="admin@carnaval.uy"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                            placeholder="Tu contraseña"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-sm text-gray-500 hover:text-black transition-colors underline"
                    >
                        ← Volver al menú principal
                    </a>
                </div>
            </div>
        </div>
    );
}
