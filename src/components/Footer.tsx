"use client";

import { useState } from "react";

export function Footer() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <footer className="bg-[var(--footer-bg)] border-t border-gray-200 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* CTA */}
                <h2 className="text-2xl mb-8 text-center">¡Contactate con nosotros!</h2>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4 mb-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre y apellido*"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                required
                                className="w-full bg-white border-b rounded-lg p-2 focus:border-black focus:outline-none transition-colors placeholder:text-gray-400"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Mail*"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full bg-white border-b rounded-lg p-2 focus:border-black focus:outline-none transition-colors placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <textarea
                            placeholder="Mensaje*"
                            value={formData.mensaje}
                            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                            required
                            rows={4}
                            className="w-full bg-white border-b rounded-lg p-2 focus:border-black focus:outline-none transition-colors resize-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            Enviar
                        </button>
                    </div>
                </form>

                {/* Copyright */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>©2026 Biblioteca Oficial del Carnaval Montevideano</p>
                    <div className="flex items-center gap-4 text-black">
                        <a href="#" aria-label="WhatsApp" className="hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="X" className="hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <div className="h-5 border-l border-gray-300 mx-2"></div>
                        <img src="/footerlogo.png" alt="Footer Logo" className="h-8" />
                    </div>
                </div>
            </div>
        </footer>
    );
}