"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logo from '../../public/assets/images/lionhearth_logo.png'

const useUser = () => ({ user: null, loading: false })

export default function Lionhearth() {
  const { user, loading } = useUser()
  const router = useRouter()
 
  useEffect(() => {
    if (!(user || loading)) {
      router.push('/auth/login')
    } else {
      router.push('/home')
    }
  }, [user, loading, router])
  return (
    <main className="flex align-middle justify-center bg-zinc-900 h-[1080px]">
      <div className="z-20 flex-col items-center align-middle justify-center">
            <Image 
            src={logo}
            alt="Logo da Lionhearth"
            className="mt-40"
            width={300}
            height={100}
            />
            <h1 className="text-white ml-28 my-0 text-lg font-bold">Loading...</h1>
      </div>
    </main>
  );
}
