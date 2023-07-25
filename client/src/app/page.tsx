"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logo from '../../public/assets/images/lionhearth_logo.png'
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
interface DecodedToken {
  id: string;
}

export default function Lionhearth() {
  const router = useRouter()
  const token = Cookies.get('token');
  const API_URL = "https://api-lionhearth.vercel.app/users"
  const decodedToken: DecodedToken = jwtDecode(token || "");
  const userId = decodedToken?.id; // Use optional chaining to handle the possibility of undefined
  useEffect(() => {
    const checkUserExistence = async (userId: string): Promise<void> => { // Change the parameter type to 'string'
      try {
        const response = await fetch(`${API_URL}/${userId}`);
        if (response.ok) {
          router.push("/pt-br/home");
        } else {
          Cookies.remove("token");
          router.push("/");
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
    <main className="flex align-middle justify-center bg-zinc-900 h-[1080px]">
      <div className="z-20 flex-col items-center align-middle justify-center">
        <Image 
          src={logo}
          alt="Logo da Lionhearth"
          className="mt-40"
          width={300}
          height={100}
        />
        <h1 className="ml-16 my-0 text-3xl font-bold text-gray-200">Carregando...</h1>
      </div>
    </main>
  );
}

