"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ChevronUp } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Header() {
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const headerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setMobileMenuOpen(false);
        };

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mobileMenuOpen]);

    const categories = [
        { name: "Humoristas", slug: "humoristas" },
        { name: "Murgas", slug: "murgas" },
        { name: "Parodistas", slug: "parodistas" },
        { name: "Revistas", slug: "revistas" },
        { name: "Sociedad de negros y lubolos", slug: "sociedades" },
    ];

    const navLinkClass = (href: string) => {
        const isActive = pathname === href;
        return `px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${isActive
            ? "bg-black text-white border-black"
            : "bg-[var(--nav-button-bg)] text-black hover:bg-black hover:text-white hover:border-black"
            }`;
    };
    return (
        <header ref={headerRef} className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md shadow-md border-b border-gray-100">
            <div className="w-full max-w-full mx-auto px-6 py-4">
                <div className="flex items-center justify-between ">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <span className="text-md md:text-md tracking-wider uppercase leading-tight">
                            BIBLIOTECA OFICIAL <br />DEL CARNAVAL<br /> MONTEVIDEANO
                        </span>
                        <img src="/logo_biblioteca_optimizado.svg" alt="Biblioteca Carnaval" className="object-contain flex-shrink-0 hidden sm:block" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden nav:flex items-center gap-0.5">
                        <SearchBar />
                        <Link href="/" className={navLinkClass("/")}>
                            Inicio
                        </Link>
                        <Link href="/nuestra-biblioteca" className={navLinkClass("/nuestra-biblioteca")}>
                            Nuestra biblioteca
                        </Link>

                        {/* Dropdown Categorías */}
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (closeTimeoutRef.current) {
                                    clearTimeout(closeTimeoutRef.current);
                                }
                                setCategoriesOpen(true);
                            }}
                            onMouseLeave={() => {
                                closeTimeoutRef.current = setTimeout(() => {
                                    setCategoriesOpen(false);
                                }, 150);
                            }}
                        >
                            <button className={`flex items-center gap-1 text-sm font-medium px-5 py-2 transition-all duration-300 ease-in-out text-black hover:bg-black hover:text-white ${pathname.startsWith("/categorias") ? "bg-black text-white " : categoriesOpen ? "bg-white text-black" : "bg-[var(--nav-button-bg)]"}`}>
                                Categorías
                                {categoriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {categoriesOpen && (
                                <div
                                    className="absolute top-full left-0 mt-0 bg-white rounded-md shadow-lg min-w-[250px] py-2"
                                    onMouseEnter={() => {
                                        if (closeTimeoutRef.current) {
                                            clearTimeout(closeTimeoutRef.current);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        closeTimeoutRef.current = setTimeout(() => {
                                            setCategoriesOpen(false);
                                        }, 150);
                                    }}
                                >
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/categorias/${category.slug}`}
                                            className="block px-4 py-2 text-black hover:bg-[var(--nav-button-bg)] transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/historia" className={navLinkClass("/historia")}>
                            Historia
                        </Link>
                        <Link href="/carnaval-2026" className={navLinkClass("/carnaval-2026")}>
                            Carnaval 2026
                        </Link>

                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="nav:hidden text-black"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="nav:hidden mt-4 pb-4  pt-4 space-y-3">
                        <div className="mb-4" >
                            <SearchBar onSelect={() => setMobileMenuOpen(false)} />
                        </div>
                        <Link href="/" className="block text-black hover:opacity-60 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            Inicio
                        </Link>
                        <Link href="/nuestra-biblioteca" className="block text-black hover:opacity-60 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            Nuestra biblioteca
                        </Link>

                        <div>
                            <button
                                onClick={() => setCategoriesOpen(!categoriesOpen)}
                                className="flex items-center gap-1 text-black hover:opacity-60 transition-opacity w-full"
                            >
                                Categorías
                                <ChevronDown size={16} className={categoriesOpen ? "rotate-180" : ""} />
                            </button>

                            {categoriesOpen && (
                                <div className="pl-4 mt-2 space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/categorias/${category.slug}`}
                                            className="block text-black hover:opacity-60 transition-opacity text-sm"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/historia" className="block text-black hover:opacity-60 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            Historia
                        </Link>
                        <Link href="/carnaval-2026" className="block text-black hover:opacity-60 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            Carnaval 2026
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}