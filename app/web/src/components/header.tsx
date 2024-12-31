import Image from 'next/image'
import logo from '@/assets/logo-icon.svg'
import { ProfileButton } from './profile-button'
import { Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/auth/auth'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'
import Link from 'next/link'
import { ProjectSwitcher } from './project-switcher'
import { PendingInvites } from './pending-invites'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1280px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src={logo} className="size-6 dark:invert" alt="Logo" />
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-border" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
