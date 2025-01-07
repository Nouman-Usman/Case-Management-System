import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apna Waqeel ⚖️ Your Ultimate Case Management',
  description: 'Take your Case Management to the next level with Apna Waqeel. Manage your cases, clients, and documents with ease. Get started today!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {children}
        </body>
    </html>
  )
}
