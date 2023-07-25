import { Metadata } from "next"
import Image from "next/image"
import Menu from '../../../components/br-menu-home'
import { Separator } from "../../../components/ui/separator"
import { SidebarNav } from "../../../components/sidebar-nav"

export const metadata: Metadata = {
  title: "Configurações | Lionhearth",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/pt-br/settings",
  },
  {
    title: "Conta",
    href: "/pt-br/settings/account",
  },
  {
    title: "Aparência",
    href: "/pt-br/settings/appearance",
  },
  {
    title: "Notificações",
    href: "/pt-br/settings/notifications",
  },
  {
    title: "Exibição",
    href: "/pt-br/settings/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
    
      <aside className="flex">
      <Menu></Menu>
        <div className="md:hidden ml-32">
          <Image
            src="/examples/forms-light.png"
            width={1280}
            height={791}
            alt="Forms"
            className="block dark:hidden"
          />
          <Image
            src="/examples/forms-dark.png"
            width={1280}
            height={791}
            alt="Forms"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden space-y-6 p-10 pb-16 ml-20 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
            <p className="text-muted-foreground">
              Organize as configurações da sua conta e insira preferências de e-mail.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </aside>
    </>
  )
}