"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
        <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              className="text-black"
              id="username"
              placeholder="Nome de usuário ou E-mail"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>
            <Input
              className="text-black"
              id="password"
              placeholder="Sua senha"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button className="bg-red-700 hover:bg-red-600" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
            )}
            Entrar em sua conta
          </Button>
          <div className="flex items-center mt-2">
            <Label className="sr-only" htmlFor="email">
              Aceita receber noticías?
            </Label>
            <Input
              id="news"
              className="mr-2 w-4 h-4 cursor-pointer accent-red-600"
              placeholder="Confirme a sua senha"
              type="checkbox"
              autoCapitalize="none"
              autoComplete="news"
              autoCorrect="off"
              disabled={isLoading}
            />
            <p className="w-96">Lembre-se de mim.</p>
          </div>
          <span>Ainda não possuí uma conta? <a href="/auth/sign-up" className="w-96 text-red-700 underline cursor-pointer hover:text-red-600 underline-offset-4 hover:text-primary">Cadastre-se</a>.</span>
        </div>
      </form>
    </div>
  )
}