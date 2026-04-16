'use client'

import { useRouter } from "next/navigation";
import { signOut } from '../actions'
import { useAuth } from '../layout'
import { LogOut, Settings } from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const handleLogout = async () => {
        const result = await signOut();
        if (result?.success) {
            // Logout exitoso, redirigir al login
            window.location.href = '/admin/login';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        );
    }

    // El middleware ya protege esta ruta, si llegamos aquí hay sesión
    if (!user) {
        return null; // Caso extremo que no debería ocurrir
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                            <p className="text-sm text-gray-500">Bienvenido, {user?.email}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
                            >
                                <LogOut size={16} />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cards de opciones */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                    <Settings className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">Gestión de Contenido</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Administrar categorías, agrupaciones y espectáculos
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <a
                                    href="/admin/entities"
                                    className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Administrar entidades
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <Settings className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">Novedades</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Gestionar noticias y anuncios
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <a
                                    href="/admin/novedades"
                                    className="flex items-center text-sm font-medium text-green-600 hover:text-green-500"
                                >
                                    Administrar novedades
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                                    <Settings className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">Usuarios</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Gestión de usuarios y permisos
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    disabled
                                    className="flex items-center text-sm font-medium text-gray-400 cursor-not-allowed"
                                >
                                    Próximamente
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
