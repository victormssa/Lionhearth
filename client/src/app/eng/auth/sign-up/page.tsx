import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import archeiBlack from '../../../../../public/assets/images/archei_black.png'
import archeiWhite from '../../../../../public/assets/images/archei_white.png'
import logo from '../../../../../public/assets/images/lionhearth_logo.png'
import { cn } from "@/lib/utils"
import { buttonVariants } from "../../../../components/ui/button"
import { UserSignUpForm } from "../../../../components/user-signup-form"

export const metadata: Metadata = {
  title: "Sign Up | Lionhearth",
  description: "Authentication forms built using the components.",
}

export default function SignUp() {
  return (
    <>
      <div className="container relative h-[1080px] flex-col items-center justify-center bg-zinc-900 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="hidden relative flex-col px-10 h-full text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <a className="flex relative z-20 items-center text-lg font-medium" href="https://archei.vercel.app">
            <Image 
            src={archeiWhite}
            alt="Logo da Archei Software"
            width={200}
            height={100}
            />
          </a>
          <div className="flex relative z-20 justify-center items-center">
            <Image 
            src={logo}
            alt="Logo da Lionhearth"
            width={550}
            height={100}
            />
          </div>
        </div>
        <div className="mb-20 lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Crie uma conta
              </h1>
              <p className="text-sm text-white text-muted-foreground">
                Entre com seus dados abaixo para criar a sua conta
              </p>
            </div>
            <UserSignUpForm />
            <p className="px-8 text-sm text-center text-white text-muted-foreground">
              Ao continuar, você aceita os nossos {" "}
              <Link
                href="/terms"
                className="text-red-700 underline hover:text-red-600 underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="text-red-700 underline hover:text-red-600 underline-offset-4 hover:text-primary"
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