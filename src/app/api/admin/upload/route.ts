import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function isAuthenticated(req: NextRequest) {
    const session = req.cookies.get('admin_session');
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin_token_secret';
    return session?.value === validToken;
}

const VALID_CATEGORIES = ['murgas', 'humoristas', 'parodistas', 'revistas', 'sociedades', 'novedades'];

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
        return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
        return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const uploadDir = path.join(process.cwd(), 'public', 'images', category);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/${category}/${safeName}`;
    return NextResponse.json({ success: true, url: publicUrl });
}
