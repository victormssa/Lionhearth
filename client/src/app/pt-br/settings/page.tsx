'use client'
import Image from 'next/image'
import type { Metadata } from "next"
import { Separator } from "../../../components/ui/separator"
import { ProfileForm } from "../../../components/profile-form"

export const metadata: Metadata = {
  title: 'Configurações | Lionhearth',
  description: 'Your own tabletop RPG.',
}
export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          é assim que suas informações serão exibidas.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}