import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD || 'vibing2025'
const COOKIE_NAME = 'site-authenticated'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === PASSWORD) {
      // Create response with authentication cookie
      const response = NextResponse.json({ success: true })
      
      // Set HTTP-only cookie for security
      response.cookies.set(COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // No maxAge = session cookie (expires when browser closes)
        path: '/',
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'nah thats wrong bro' },
        { status: 401 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}