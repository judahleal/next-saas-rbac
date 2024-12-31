import { api } from './api-client'

export async function rejecttInvite(inviteId: string) {
  await api.post(`invites/${inviteId}/reject`)
}
