'use server'

import { acceptInvite } from '@/http/accept-invite'
import { rejecttInvite } from '@/http/reject-invite'
import { revalidateTag } from 'next/cache'

export async function AcceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  revalidateTag('organizations')
}

export async function RejectInviteAction(inviteId: string) {
  await rejecttInvite(inviteId)

  revalidateTag('organizations')
}
