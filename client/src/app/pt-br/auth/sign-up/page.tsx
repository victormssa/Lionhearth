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
  title: "Cadastro | Lionhearth",
  description: 'Your own tabletop RPG.',
}

export default function SignUp() {
  return (
    <>
      <div className="container relative h-[1080px] flex-col align-middle justify-center bg-zinc-900 md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center mt-24">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Cadastre-se
              </h1>
              <p className="text-sm text-white text-muted-foreground">
              Sem precisar enfrentar dragões, crie sua conta em pouquissímos segundos!
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