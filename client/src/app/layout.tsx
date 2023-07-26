import '../styles/globals.css'
import Head from 'next/head';
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
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t){if(window.ko)return;window.ko=[],["identify","track","removeListeners","open","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/pk_001b6ee02d50395822e973599a72fb1411ba/sdk.js"),(document.body || document.head).appendChild(n)();
            `,
          }}
        />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
