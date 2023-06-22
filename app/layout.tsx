import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const date = new Date()

export const metadata = {
  title: `${date.toString().slice(4, 10)} - Prayer Times`,
  description: 'Shows the prayer times for today',
  image: './moon-solid.svg',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="./icon.svg"
          type="svg"
          sizes="16x16"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
