import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import archeiBlack from '../../../../public/assets/images/archei_black.png'
import archeiWhite from '../../../../public/assets/images/archei_white.png'
import logo from '../../../../public/assets/images/lionhearth_logo.png'
import { cn } from "@/lib/utils"
import { buttonVariants } from "../../../components/ui/button"
import { UserLoginForm } from "../../../components/user-login-form"
import ThreeD20 from '../../../components/ThreeD20';
import ThreeD12 from '../../../components/ThreeD12';

export const metadata: Metadata = {
  title: "Login | Lionhearth",
  description: "Authentication forms built using the components.",
}

export default function Login() {
  return (
    <>
        <div className="relative hidden h-[1080px] flex-col bg-muted pt-20 text-white dark:border-r lg:flex bg-zinc-900 overflow-x-hidden overflow-y-hidden">
          <div className="bg-zinc-900" />
          
          <div className="relative flex justify-center mb-[-5rem]">
            <Image 
            src={logo}
            alt="Logo da Lionhearth"
            width={400}
            height={100}
            />
          </div>
          <ThreeD20 />
          <ThreeD12 />
          <div className="lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Faça o Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com seus dados para acessar a sua conta.
              </p>
            </div>
            <UserLoginForm />
            <a className=" flex justify-center mt-32" href="https://archei.vercel.app">
            <Image 
            src={archeiWhite}
            alt="Logo da Archei Software"
            width={200}
            height={100}
            />
          </a>
          </div>
        </div>
      </div>
    </>
  )
}