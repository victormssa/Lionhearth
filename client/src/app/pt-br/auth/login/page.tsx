"use client"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";
import archeiBlack from '../../../../../public/assets/images/archei_black.png'
import archeiWhite from '../../../../../public/assets/images/archei_white.png'
import logo from '../../../../../public/assets/images/lionhearth_logo.png'
import { cn } from "@/lib/utils"
import { buttonVariants } from "../../../../components/ui/button"
import { UserLoginForm } from "../../../../components/user-login-form"
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

export default function Login() {
  interface DecodedToken {
    exp: number;
    id: string;
  }
  const router = useRouter()
  const token = Cookies.get('token');
  const API_URL = "https://api-lionhearth.vercel.app/users"
  const decodedToken: DecodedToken = jwtDecode(token || "");
  const userId = decodedToken.id as string;
  useEffect(() => {
    const checkUserExistence = async (userId: string): Promise<void> => { // Change the parameter type to 'string'
      try {
        const response = await fetch(`${API_URL}/${userId}`);
        if (response.ok) {
          router.push("/pt-br/home");
        } else {
          Cookies.remove("token");
        }
      } catch (error) {
        console.error('Ocorreu um erro ao verificar a existência do usuário:', error);
      }
    };
  
    if (userId !== undefined) {
      checkUserExistence(userId);
    }
  }, [router, userId]);
  return (
    <>
        <div className="relative h-[1080px] flex-col bg-muted pt-20 text-white dark:border-r lg:flex bg-zinc-900 overflow-x-hidden overflow-y-hidden">
          <div className="bg-zinc-900" />
          
          <aside className="absolute top-0 right-0 p-4 mt-4 mr-6 w-96 rounded-lg bg-zinc-950">
            <span>
              Temos <span className="text-red-500">null</span> jogadores <span className="font-bold text-green-500">online</span> nesse momento.
            </span>
          </aside>
          
          <div className="relative flex justify-center mb-[-5rem]">
            <Image 
            src={logo}
            alt="Logo da Lionhearth"
            width={400}
            height={100}
            />
          </div>

          <div className="lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Faça o seu Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com seus dados para acessar a sua conta.
              </p>
            </div>
            <UserLoginForm />
            <a className="flex justify-center mt-32" href="https://archei.vercel.app">
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