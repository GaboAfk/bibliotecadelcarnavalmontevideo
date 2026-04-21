'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from '../actions'
import { useAuth } from '../layout'
import { Bug } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("admin@carnaval.uy");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    // Si ya está logueado, redirigir al dashboard
    useEffect(() => {
        if (user) {
            router.push('/admin/dashboard');
        }
    }, [user, router]);

    if (user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Redirigiendo al dashboard...</div>
            </div>
        );
    }

    const handleDebugLogin = async () => {
        try {
            const response = await fetch('/api/debug-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const debugInfo = await response.json();
            console.log('Login Debug Info:', debugInfo);
            alert(JSON.stringify(debugInfo, null, 2));
        } catch (error) {
            console.error('Error debugging login:', error);
            alert('Error al obtener debug de login');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn(email, password);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else if (result?.success) {
            // Login exitoso, esperar un poco y redirigir
            setTimeout(() => {
                window.location.href = '/admin/dashboard';
            }, 200);
        } else {
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

                    <div className="flex justify-center pt-2">
                        <button
                            type="button"
                            onClick={handleDebugLogin}
                            disabled={loading}
                            className="flex items-center gap-2 text-xs text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50"
                        >
                            <Bug size={12} />
                            Debug Login
                        </button>
                    </div>
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
