'use client'
import {
  CreditCard,
  LifeBuoy,
  LogOut,
  User,
  UserPlus,
  Dot
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../components/ui/dropdown-menu";

import { useEffect, useState } from 'react';
import { BiSolidCartDownload } from 'react-icons/bi';
import { FaDiceD20, FaUserFriends } from 'react-icons/fa';
import { IoNotifications, IoSettings } from 'react-icons/io5'
import { MdPersonSearch } from 'react-icons/md'
import { HiUserAdd } from 'react-icons/hi'
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { useRouter, usePathname } from "next/navigation";

import Image from 'next/image';
import logo from '../../public/assets/images/apple-touch-icon.png';
import avatarHayato from '../../public/assets/images/hayato.png';
import avatarSho from '../../public/assets/images/Sho.png';
import avatarLoli from './../../public/assets/images/1.png';
import avatarHitler from './../../public/assets/images/2.jpg';
import { Input } from "./ui/input";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

export default function Menu() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [inputType, setInputType] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState("");
  const [pesquisarOpen, setPesquisarOpen] = useState(false);
  const [addAmigoOpen, setAddAmigoOpen] = useState(false);
  const [status, setStatus] = useState("");

  const API_URL = "https://api-lionhearth.vercel.app/users"
  
  useEffect(() => {

    const token = Cookies.get('token');

    const fetchUser = async () => {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id;
        setUserId(userId);

        if (userId) {
          const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
          };

          try {
            const response = await axios.get(`${API_URL}/${userId}`, config);
            const imageBuffer = response.data.profileImage.data; // obtém o buffer de imagem do response
            const username = response.data.username;
            const blob = new Blob([new Uint8Array(imageBuffer)], {
              type: "image/*",
            }); // cria um objeto Blob a partir do buffer
            const imageUrl = URL.createObjectURL(blob); // cria um URL para o objeto Blob
            setProfileImage(imageUrl); // define a URL como a fonte da imagem
            setUsername(username)
            checkAndSetProfileImage(imageUrl);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    
    const checkAndSetProfileImage = (imageUrl: any) => {
      if (!imageUrl) {
        // Se a imagem do perfil for nula, defina-a com o link fornecido
        const seed = username || ""; // Usando username como seed, caso esteja disponível
        const defaultImageURL = `https://api.dicebear.com/6.x/initials/svg?seed=${seed}&fontWeight=600`;
        setProfileImage(defaultImageURL);
      }
    };

    const checkUserExistence = async (userId: string | null): Promise<void> => {
      try {
        if (userId !== null) {
          const response = await fetch(`${API_URL}/${userId}`);
          if (response.ok) {
            console.log();
          } else {
            Cookies.remove("token");
            router.push("/");
          }
        }
      } catch (error) {
        console.error('Ocorreu um erro ao verificar a existência do usuário:', error);
      }
    };

    fetchUser();
    checkUserExistence(userId);
  }, [router, userId, username]);

  const location = usePathname();
  const isActive = (path: string) => {
    return location === path
      ? "text-red-700"
      : "text-gray-500";
  };

  const handleIconClick = (iconName: any) => {
    if (iconName === selectedIcon && iconName === 'icon1') {

      setSelectedIcon(null);
      setContactOpen(false);
    } else {
      setSelectedIcon(iconName);
      setContactOpen(iconName === 'icon1');
    }
  };
  const handleBiUserPlusClick = () => {
    // Se o input de adicionar amigo estiver aberto, feche-o
    if (addAmigoOpen) {
      setAddAmigoOpen(false);
      setInputType(''); // Limpe o estado inputType para que o input desapareça
    } else {
      // Se estiver fechado, abra o input de adicionar amigo
      // e feche o input de pesquisa, se estiver aberto
      setAddAmigoOpen(true);
      setPesquisarOpen(false);
      setInputType('addAmigo'); // Defina o estado inputType para 'addAmigo'
    }
  };

  const handleMdPersonSearchClick = () => {
    // Se o input de pesquisa estiver aberto, feche-o
    if (pesquisarOpen) {
      setPesquisarOpen(false);
      setInputType(''); // Limpe o estado inputType para que o input desapareça
    } else {
      // Se estiver fechado, abra o input de pesquisa
      // e feche o input de adicionar amigo, se estiver aberto
      setPesquisarOpen(true);
      setAddAmigoOpen(false);
      setInputType('pesquisar'); // Defina o estado inputType para 'pesquisar'
    }
  };

  const getDotColor = () => {
    switch (status) {
      case "Online":
        return "bg-emerald-500";
      case "Ocupado":
        return "bg-yellow-500";
      case "Não-Pertubar":
        return "bg-red-700";
      default:
        return "bg-emerald-500"; // Cor padrão, caso o status não corresponda a nenhum caso acima
    }
  };

  return (
    <>
      <aside className="flex fixed">
        <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-zinc-900 dark:bg-gray-900 dark:border-gray-700">
          <a href="#">
            <Image className="w-12 h-auto" src={logo} alt="" />
          </a>
          <a href="home" onClick={() => handleIconClick('icon2')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon2' ? 'text-red-700' : 'text-gray-500'} ${isActive("/pt-br/home")}`}>
            <FaDiceD20 className='text-2xl'></FaDiceD20>
          </a>

          <span onClick={() => handleIconClick('icon1')} className={`p-1.5 cursor-pointer hover:text-red-500  focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon1' ? 'text-red-700' : 'text-gray-500'}`}>
            <FaUserFriends className='text-2xl'></FaUserFriends>
          </span>

          <a href="store" onClick={() => handleIconClick('icon3')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon3' ? 'text-red-700' : 'text-gray-500'} ${isActive("/pt-br/store")}`}>
            <BiSolidCartDownload className='text-3xl'></BiSolidCartDownload>
          </a>

          <span onClick={() => handleIconClick('icon4')} className={`p-1.5 cursor-pointer hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon4' ? 'text-red-700' : 'text-gray-500'}`}>
            <IoNotifications className='text-2xl'></IoNotifications>
          </span>

          <a href="settings" onClick={() => handleIconClick('icon5')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon5' ? 'text-red-700' : 'text-gray-500'} ${isActive("/pt-br/settings")}`}>
            <IoSettings className='text-2xl'></IoSettings>
          </a>
          <div className='absolute bottom-2 '>
            <DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='relative'>
                    <Image className="object-cover w-12 h-12 rounded-full border-2 border-red-700" src={profileImage} alt='' width={400} height={400} />
                    <span className={`h-3 w-3 rounded-full absolute right-1 bottom-0 ${getDotColor()}`}></span>                  
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className='relative'>
                    <Image className="object-cover w-20 h-20 rounded-full border-2 border-red-700" src={profileImage} alt='' width={400} height={400} />
                    <span className={`h-4 w-4 rounded-full ${getDotColor()} absolute right-36 ring-1 ring-white bottom-0`}></span> 
                  </div>
                  <DropdownMenuLabel>{username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Assinatura</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Status</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setStatus("Online")}>
                            <Dot className="h-10 w-10 text-green-500" />
                            <span>Online</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatus("Ocupado")}>
                            <Dot className="h-10 w-10 text-yellow-500" />
                            <span>Ocupado</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatus("Não-Pertubar")}>
                            <Dot className="h-10 w-10 text-red-500" />
                            <span>Não pertubar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Suporte</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenu>
          </div>
        </div>
        <div className={`h-screen ${contactOpen ? 'block' : 'hidden'} py-8 overflow-y-auto bg-zinc-900 border-zinc-950 border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700`}>
          <h2 className="px-5 text-lg font-medium text-white dark:text-white">Contatos ( 3 / 4 )</h2>
          <div className="mt-8 space-y-4">
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-zinc-800 focus:outline-none">
              <Image className="object-cover w-8 h-8 rounded-full" src={avatarHayato} width={400} height={400} alt="" />
              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-white capitalize dark:text-white">Gustavo Rosado</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Offline</p>
              </div>
            </button>
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-zinc-800 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
              <div className="relative">
                <Image className="object-cover w-8 h-8 rounded-full" src={avatarSho} width={400} height={400} alt="" />
                <span className="h-2 w-2 rounded-full bg-yellow-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
              </div>
              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-white capitalize dark:text-white">Bruno Seixas</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ocupado</p>
              </div>
            </button>
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-zinc-800 dark:bg-gray-800 gap-x-2 focus:outline-none">
              <div className="relative">
                <Image className="object-cover w-8 h-8 rounded-full" src={avatarLoli} width={400} height={400} alt="" />
                <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
              </div>
              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-white capitalize dark:text-white">Felipe Lima</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
              </div>
            </button>
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-zinc-800 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
              <div className="relative">
                <Image className="object-cover w-8 h-8 rounded-full" src={avatarHitler} width={400} height={400} alt="" />
                <span className="h-2 w-2 rounded-full bg-red-700 absolute right-0.5 ring-1 ring-white bottom-0"></span>
              </div>
              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-white capitalize dark:text-white">Guilherme</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Não pertubar</p>
              </div>
            </button>
            <div>
              <div className="relative mt-[31rem]">
                <MdPersonSearch
                  onClick={handleMdPersonSearchClick}
                  className="text-2xl absolute top-[0.5rem] left-[10rem] cursor-pointer hover:text-red-600 text-gray-400 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800"
                />
                {inputType === 'pesquisar' && ( // Show the "Pesquisar" input only when inputType is 'pesquisar'
                  <div className='relative'>
                    <Input
                      placeholder="Pesquisar"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      className="bg-zinc-900 absolute top-[-3rem] w-60 ml-2 border-red-700">
                    </Input>
                    <AiOutlineSearch className='absolute bottom-[1.25rem] left-[14rem] text-gray-400 hover:text-red-500 cursor-pointer' />
                  </div>
                )}
                <HiUserAdd
                  onClick={handleBiUserPlusClick}
                  className="text-2xl absolute top-[0.5rem] left-[4rem] cursor-pointer hover:text-red-600 text-gray-400 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800"
                />
                {inputType === 'addAmigo' && ( // Show the "Add Amigo" input only when inputType is 'addAmigo'
                  <div className='relative'>
                    <Input
                      placeholder="Username"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      className="bg-zinc-900 absolute top-[-3rem] w-60 ml-2 border-red-700">
                    </Input>
                    <AiOutlinePlus className='absolute bottom-[1.25rem] left-[14rem] text-gray-400 hover:text-red-500 cursor-pointer' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}