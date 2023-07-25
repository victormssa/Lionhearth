'use client'
import { Separator } from "../../../components/ui/separator"
import { ProfileForm } from "../../../components/profile-form"

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