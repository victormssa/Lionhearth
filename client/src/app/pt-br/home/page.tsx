import Image from 'next/image'
import type { Metadata } from "next"
import Menu from '../../../components/br-menu-home'

export const metadata: Metadata = {
  title: 'Home | Lionhearth',
  description: 'Your own tabletop RPG.',
}
export default function Home() {
  return (
    <>
    <main className='bg-zinc-800 w-[1920px] h-auto'>
    <Menu></Menu>
    </main>
    </>
  )
}