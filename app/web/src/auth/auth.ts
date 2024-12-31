import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'
import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  return !!(await cookies()).get('token')?.value
}

export async function getCurrentOrg() {
  return (await cookies()).get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) return null

  const { membership } = await getMembership(org)

  return membership
}

export async function ability() {
  const memberbership = await getCurrentMembership()
  if (!memberbership) return null
  const ability = defineAbilityFor({
    id: memberbership.userId,
    role: memberbership.role,
  })
  return ability
}

export async function auth() {
  const token = (await cookies()).get('token')?.value

  if (!token) redirect('/auth/sign-in')

  try {
    const user = await getProfile()

    return user
  } catch {}

  redirect('/api/auth/sign-out')
}
