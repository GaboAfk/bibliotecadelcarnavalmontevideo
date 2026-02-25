import { NextRequest, NextResponse } from 'next/server';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface AttemptRecord {
    count: number;
    lockedUntil: number | null;
}

const attempts = new Map<string, AttemptRecord>();

function getIp(req: NextRequest): string {
    return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

export async function POST(req: NextRequest) {
    const ip = getIp(req);
    const now = Date.now();

    const record = attempts.get(ip) ?? { count: 0, lockedUntil: null };

    if (record.lockedUntil && now < record.lockedUntil) {
        const remaining = Math.ceil((record.lockedUntil - now) / 60000);
        return NextResponse.json(
            { error: `Demasiados intentos. Bloqueado por ${remaining} min más.` },
            { status: 429 }
        );
    }

    // Reset if lockout expired
    if (record.lockedUntil && now >= record.lockedUntil) {
        record.count = 0;
        record.lockedUntil = null;
    }

    const { password } = await req.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
        record.count += 1;
        if (record.count >= MAX_ATTEMPTS) {
            record.lockedUntil = now + LOCKOUT_MS;
        }
        attempts.set(ip, record);
        const left = MAX_ATTEMPTS - record.count;
        const msg = left > 0
            ? `Contraseña incorrecta. ${left} intento${left !== 1 ? 's' : ''} restante${left !== 1 ? 's' : ''}.`
            : `Demasiados intentos. Bloqueado por 15 min.`;
        return NextResponse.json({ error: msg }, { status: 401 });
    }

    // Success — reset counter
    attempts.delete(ip);

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', process.env.ADMIN_SESSION_TOKEN || 'admin_token_secret', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
    });
    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');
    return response;
}
