import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import type { Metadata } from 'next'
const inter = Inter({ subsets: ['latin']})
import GoogleTagManager from '@/lib/utils/GoogleTagManager'


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
    <Head>
      <GoogleTagManager/>
    </Head>
      <body className={inter.className}>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NNZJQK7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        {children}
      </body>
    </html>
  )
}
