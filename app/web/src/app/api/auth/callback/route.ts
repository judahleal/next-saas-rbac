import { acceptInvite } from '@/http/accept-invite'
import { signInWithGithub } from '@/http/sign-in-with-github'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth token was not found.' },
      { status: 400 }
    )
  }

  const { token } = await signInWithGithub({ code })

  ;(await cookies()).set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  const inviteId = (await cookies()).get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite(inviteId)
      ;(await cookies()).delete('inviteId')
    } catch {}
  }

  const redirectURL = request.nextUrl.clone()
  redirectURL.pathname = '/'
  redirectURL.search = ''

  return NextResponse.redirect(redirectURL)
}
