import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import archeiBlack from '../../../../public/assets/images/archei_black.png'
import archeiWhite from '../../../../public/assets/images/archei_white.png'
import logo from '../../../../public/assets/images/lionhearth_logo.png'
import { cn } from "@/lib/utils"
import { buttonVariants } from "../../../components/ui/button"
import { UserAuthForm } from "../../../components/user-auth-form"

export const metadata: Metadata = {
  title: "Sign In | Lionhearth",
  description: "Authentication forms built using the components.",
}

export default function SignIn() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[1080px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <a className="relative z-20 flex items-center text-lg font-medium" href="https://archei.vercel.app">
            <Image 
            src={archeiWhite}
            alt="Logo da Archei Software"
            width={200}
            height={100}
            />
          </a>
          <div className="relative z-20 flex items-center justify-center">
            <Image 
            src={logo}
            alt="Logo da Lionhearth"
            width={550}
            height={100}
            />
          </div>
          <div className="relative z-20 mt-auto mb-32">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Eu tive a oportunidade de experimentar o Lionhearth, e estou extremamente impressionado com a qualidade e funcionalidade deste aplicativo desktop para jogar tabletop RPG com amigos. A combinação dos frameworks e tecnologias utilizadas, como Tauri, Next.js e Typescript, resulta em uma experiência suave e intuitiva&rdquo;
              </p>
              <footer className="text-sm">Usuário Desconhecido</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre seu email abaixo para criar a sua conta
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao continuar, você aceita os nossos {" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Políticas de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}