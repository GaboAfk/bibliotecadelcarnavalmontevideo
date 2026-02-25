import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

function isAuthenticated(req: NextRequest) {
    const session = req.cookies.get('admin_session');
    const validToken = process.env.ADMIN_SESSION_TOKEN || 'admin_token_secret';
    return session?.value === validToken;
}

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { commitMessage } = await req.json();
    const cwd = process.cwd();

    try {
        // Step 1: Build check
        const { stdout: buildOut, stderr: buildErr } = await execAsync('yarn next build', { cwd, timeout: 120000 });

        // Step 2: Git add + commit + push
        await execAsync('git add -A', { cwd });
        await execAsync(`git commit -m "${(commitMessage || 'Admin: update data').replace(/"/g, "'")}"`, { cwd });
        const { stdout: pushOut } = await execAsync('git push origin main', { cwd });

        return NextResponse.json({
            success: true,
            buildOutput: buildOut || buildErr,
            pushOutput: pushOut,
        });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: err.message,
            stdout: err.stdout,
            stderr: err.stderr,
        }, { status: 500 });
    }
}
