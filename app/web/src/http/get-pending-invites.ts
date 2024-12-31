import { Role } from '@saas/auth'
import { api } from './api-client'

interface GetPendingInvitesResponse {
  invites: {
    id: string
    role: Role
    email: string
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get('peding-invites')
    .json<GetPendingInvitesResponse>()

  return result
}