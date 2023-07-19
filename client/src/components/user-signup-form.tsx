"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
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
            <p>Seu nome de usuário</p>
            <Input
              id="username"
              placeholder="Nome de usuário"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <p>Seu e-mail</p>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Celular para contato
            </Label>
            <p>Seu número para contato</p>
            <Input
              id="cellphone"
              placeholder="(+DDD) X XXXX-XXXX"
              type="tel"
              autoCapitalize="none"
              autoComplete="cellphone"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>
            <p>Sua senha</p>
            <Input
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>
            <p>Confirme sua senha</p>
            <Input
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Sua data de aniversário
            </Label>
           <p>Sua data de nascimento</p>
            <Input
              id="date"
              placeholder="Confirme a sua idade"
              type="date"
              autoCapitalize="none"
              autoComplete="date"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Cadastre-se com o Email
          </Button>
          <div className="flex mt-2  items-center">
            <Label className="sr-only" htmlFor="email">
              Aceita receber noticías?
            </Label>
            <Input
              id="news"
              className="w-4 h-4 mr-2 cursor-pointer accent-red-600"
              placeholder="Confirme a sua senha"
              type="checkbox"
              autoCapitalize="none"
              autoComplete="news"
              autoCorrect="off"
              disabled={isLoading}
            />
            <p className="w-96">Aceito receber notícias sobre a Lionhearth.</p>
          </div>
          <span>Já possuí uma conta? <a href="/auth/login" className="w-96 text-red-700 hover:text-red-600 cursor-pointer underline underline-offset-4 hover:text-primary">Faça Login</a>.</span>
        </div>
      </form>
    </div>
  )
}