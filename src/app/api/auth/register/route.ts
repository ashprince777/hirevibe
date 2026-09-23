import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken, getAuthCookieOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role = 'CANDIDATE', companyName, headline } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const validRole = role === 'EMPLOYER' ? 'EMPLOYER' : 'CANDIDATE';

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        role: validRole,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=fff`,
        ...(validRole === 'CANDIDATE'
          ? {
              candidateProfile: {
                create: {
                  headline: headline || 'Professional seeking new opportunities',
                },
              },
            }
          : {
              employerProfile: {
                create: {
                  companyName: companyName || `${name}'s Company`,
                },
              },
            }),
      },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role as any,
      name: user.name,
    });

    const response = NextResponse.json(
      {
        message: 'Account registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      },
      { status: 201 }
    );

    const cookieOptions = getAuthCookieOptions();
    response.cookies.set(cookieOptions.name, token, cookieOptions);

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error during registration' }, { status: 500 });
  }
}
