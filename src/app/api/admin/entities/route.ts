import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { murgasData, murgasAlphabet } from '@/data/murgas';
import { humoristasData, humoristasAlphabet } from '@/data/humoristas';
import { parodistasData, parodistasAlphabet } from '@/data/parodistas';
import { revistasData, revistasAlphabet } from '@/data/revistas';
import { sociedadesData, sociedadesAlphabet } from '@/data/sociedades';
import { novedadesData } from '@/data/novedades';

function isAuthenticated(req: NextRequest) {
    const session = req.cookies.get('admin_session');
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin_token_secret';
    return session?.value === validToken;
}

const STATIC_DATA: Record<string, unknown> = {
    murgas: murgasData,
    humoristas: humoristasData,
    parodistas: parodistasData,
    revistas: revistasData,
    sociedades: sociedadesData,
    novedades: novedadesData,
};

function flattenAlphabet(alpha: Record<string, string[]>): string[] {
    return Object.values(alpha).flat().sort((a, b) => a.localeCompare(b));
}

const AVAILABLE_NAMES: Record<string, string[]> = {
    murgas: flattenAlphabet(murgasAlphabet),
    humoristas: flattenAlphabet(humoristasAlphabet),
    parodistas: flattenAlphabet(parodistasAlphabet),
    revistas: flattenAlphabet(revistasAlphabet),
    sociedades: flattenAlphabet(sociedadesAlphabet),
    novedades: [],
};

const CATEGORY_CONFIG: Record<string, { file: string; varName: string; isArray: boolean }> = {
    murgas: { file: 'src/data/murgas.ts', varName: 'murgasData', isArray: false },
    humoristas: { file: 'src/data/humoristas.ts', varName: 'humoristasData', isArray: false },
    parodistas: { file: 'src/data/parodistas.ts', varName: 'parodistasData', isArray: false },
    revistas: { file: 'src/data/revistas.ts', varName: 'revistasData', isArray: false },
    sociedades: { file: 'src/data/sociedades.ts', varName: 'sociedadesData', isArray: false },
    novedades: { file: 'src/data/novedades.ts', varName: 'novedadesData', isArray: true },
};

// Helper: generate TS file content from JSON data
function generateCategoryFile(
    category: string,
    data: Record<string, unknown> | unknown[],
    config: { varName: string; isArray: boolean }
): string {
    const json = JSON.stringify(data, null, 4);
    // Only unquote keys that are valid JS identifiers (letters, digits, $, _ — no hyphens)
    const dataExpr = json.replace(/"([A-Za-z_$][A-Za-z0-9_$]*)":/g, '$1:');

    if (category === 'novedades') {
        return `import { slugify } from '@/utils/slugify';

export interface Novedad {
    id: string;
    color: string;
    title: string;
    image: string;
    description: string;
    content: string;
    date: string;
}

export const novedadesData: Novedad[] = ${dataExpr};

export const novedadesAlphabet: Record<string, string[]> = {
    "N": novedadesData.map(n => n.title),
};

export const availableNovedades = novedadesData.map(n => n.title);
`;
    }

    const interfaceName = category.slice(0, -1).charAt(0).toUpperCase() + category.slice(0, -1).slice(1) + 'Data';
    const capitalCategory = category.charAt(0).toUpperCase() + category.slice(1);

    return `import { slugify } from '@/utils/slugify';

export interface ShowSection {
    title: string;
    content?: string;
    lyrics?: string;
}

export interface ShowCredit {
    role: string;
    names: string[];
}

export interface Show {
    id: string;
    title: string;
    image: string;
    year?: number;
    promotionDate?: string;
    repertoire?: ShowSection[];
    gallery?: string[];
    data?: string;
    credits?: ShowCredit[];
}

export interface ${interfaceName} {
    name: string;
    description: string;
    history: string;
    shows: Show[];
    positions?: string[];
    discography?: string[];
    trivia?: string[];
    gallery?: string[];
    information?: string;
}

export const ${config.varName}: Record<string, ${interfaceName}> = ${dataExpr};

export const ${category}Alphabet: Record<string, string[]> = Object.fromEntries(
    [...new Set(Object.values(${config.varName}).map(e => e.name[0].toUpperCase()))].sort().map(letter => [
        letter,
        Object.values(${config.varName}).filter(e => e.name.toUpperCase().startsWith(letter)).map(e => e.name),
    ])
);

export const available${capitalCategory} = Object.values(${config.varName}).map(e => e.name);
`;
}

function readCategoryData(category: string): unknown {
    const config = CATEGORY_CONFIG[category];
    return STATIC_DATA[category] ?? (config.isArray ? [] : {});
}

export async function GET(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    if (!category || !CATEGORY_CONFIG[category]) {
        return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const data = readCategoryData(category);
    const available = AVAILABLE_NAMES[category] ?? [];
    return NextResponse.json({ data, available });
}

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { category, data } = await req.json();

    if (!category || !CATEGORY_CONFIG[category]) {
        return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const config = CATEGORY_CONFIG[category];
    const filePath = path.join(process.cwd(), config.file);
    const newContent = generateCategoryFile(category, data, config);

    fs.writeFileSync(filePath, newContent, 'utf-8');
    return NextResponse.json({ success: true });
}
