'use client'

import { useEffect, useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import Image from 'next/image'
import logo from '../../../../public/assets/images/apple-touch-icon.png'
import avatarHayato from '../../../../public/assets/images/hayato.png'
import avatarSho from '../../../../public/assets/images/Sho.png'
import avatarLoli from '../../../../public/assets/images/1.png'
import avatarHitler from '../../../../public/assets/images/2.jpg'
import { Input } from "../../../components/ui/input";

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  const handleIconClick = (iconName: any) => {
    if (iconName === selectedIcon && iconName === 'icon1') {
      // If the first anchor is clicked again, toggle the contact div visibility
      setContactOpen(!contactOpen);
    } else {
      setSelectedIcon(iconName);
      setContactOpen(iconName === 'icon1'); // Open the contact div when the first anchor is clicked
    }
  };



  return (
    <>
      <aside className="flex">
        <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-zinc-900 dark:bg-gray-900 dark:border-gray-700">
          <a href="#">
            <Image className="w-12 h-auto" src={logo} alt="" />
          </a>
          <a href="#" onClick={() => handleIconClick('icon2')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon2' ? 'text-red-700' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </a>
          <a href="#" onClick={() => handleIconClick('icon1')} className={`p-1.5 hover:text-red-500  focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon1' ? 'text-red-700' : 'text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </a>
          <a href="#" onClick={() => handleIconClick('icon3')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon3' ? 'text-red-700' : 'text-gray-500'}`}>            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
          </a>
          <a href="#" onClick={() => handleIconClick('icon4')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon4' ? 'text-red-700' : 'text-gray-500'}`}>             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          </a>
          <a href="#" onClick={() => handleIconClick('icon5')} className={`p-1.5 hover:text-red-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 ${selectedIcon === 'icon5' ? 'text-red-700' : 'text-gray-500'}`}>               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          </a>
        </div>

        <div className={`h-screen ${contactOpen ? 'block' : 'hidden'} py-8 overflow-y-auto bg-zinc-900 border-zinc-950 border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700`}>
          <h2 className="px-5 text-lg font-medium text-white dark:text-white">Contatos ( 3 / 4 )</h2>

          <div className="mt-8 space-y-4">
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-zinc-800 focus:outline-none">
              <Image className="object-cover w-8 h-8 rounded-full" src={avatarHayato} width={400} height={400} alt="" />

              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-white capitalize dark:text-white">Gustavo Rosado</h1>

                <p className="text-xs text-gray-500 dark:text-gray-400">Ausente</p>
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

            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-zinc-800 dark:bg-gray-800 gap-x-2 focus:outline-none">
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
            <div className="absolute top-[53rem] left-[7rem] w-40 " >
            <BiUserPlus className="text-2xl absolute top-[0.5rem] left-[-2rem] cursor-pointer hover:text-red-600 text-gray-400  focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800" />
              <Input
                placeholder="Add amigo"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                required
                className='bg-zinc-900'
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}