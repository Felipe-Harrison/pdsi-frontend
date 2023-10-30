'use client';

import './globals.css'
import { Inter } from 'next/font/google'

import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PDSI - Front End',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </NextUIProvider>
      </body>
    </html>
  )
}
