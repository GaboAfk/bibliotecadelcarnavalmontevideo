"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function getAdminHref(pathname: string): string {
    const parts = pathname.split("/").filter(Boolean);
    // /categorias/[categoria]/[slug]/espectaculos/[showName]
    if (parts[0] === "categorias" && parts[2] && parts[3] === "espectaculos" && parts[4]) {
        return `/admin/shows?agrupacion=${parts[2]}&show=${parts[4]}`;
    }
    // /categorias/[categoria]/[slug]/espectaculos
    if (parts[0] === "categorias" && parts[2] && parts[3] === "espectaculos") {
        return `/admin/shows?agrupacion=${parts[2]}`;
    }
    // /categorias/[categoria]/[slug]  (agrupación)
    if (parts[0] === "categorias" && parts[2]) {
        return `/admin/agrupaciones?slug=${parts[2]}`;
    }
    // /categorias/[categoria]
    if (parts[0] === "categorias" && parts[1]) {
        return `/admin/agrupaciones?category=${parts[1]}`;
    }
    // /novedades/[slug]
    if (parts[0] === "novedades") {
        return "/admin/novedades";
    }
    return "/admin/dashboard";
}

export function FloatingAdminButton() {
    const pathname = usePathname();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAdmin(!!session);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAdmin(!!session);
        });
        return () => subscription.unsubscribe();
    }, []);

    if (!isAdmin || pathname.startsWith("/admin")) return null;

    const href = getAdminHref(pathname);

    return (
        <Link
            href={href}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
            Panel admin
        </Link>
    );
}
