import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

function isAuthenticated(req: NextRequest) {
    const session = req.cookies.get('admin_session');
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin_token_secret';
    return session?.value === validToken;
}

const DATA_FILES: Record<string, string> = {
    murgas: 'src/data/murgas.ts',
    humoristas: 'src/data/humoristas.ts',
    parodistas: 'src/data/parodistas.ts',
    revistas: 'src/data/revistas.ts',
    sociedades: 'src/data/sociedades.ts',
    novedades: 'src/data/novedades.ts',
};

export async function GET(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    if (!category || !DATA_FILES[category]) {
        return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), DATA_FILES[category]);
    const content = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json({ content });
}

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { category, content } = await req.json();

    if (!category || !DATA_FILES[category]) {
        return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), DATA_FILES[category]);
    fs.writeFileSync(filePath, content, 'utf-8');
    return NextResponse.json({ success: true });
}
