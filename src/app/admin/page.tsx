"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/admin/verify")
            .then(r => { if (r.ok) router.replace("/admin/dashboard"); })
            .catch(() => { });
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error de autenticación");
            } else {
                router.replace("/admin/dashboard");
            }
        } catch {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                            placeholder="••••••••"
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
