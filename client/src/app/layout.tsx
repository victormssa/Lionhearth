import '../styles/globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
const inter = Inter({ subsets: ['latin']})


export const metadata: Metadata = {
  title: 'Lionhearth',
  description: 'Your own tabletop RPG.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
