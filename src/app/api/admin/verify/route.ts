import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const session = req.cookies.get('admin_session');
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin_token_secret';

    if (session?.value === validToken) {
        return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
}
