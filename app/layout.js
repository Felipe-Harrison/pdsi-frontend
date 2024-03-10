'use client';

import {NextUIProvider} from "@nextui-org/react";

import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Chef Virtual - Assistente culinário',
//   description: 'O Chef Virtual é um sistema culinário inovador projetado para auxiliar cozinheiros, sejam eles amadores ou profissionais. Nosso Chef Virtual se adapta às suas necessidades e dúvidas, tornando sua jornada culinária mais deliciosa e eficiente. Faça perguntas sobre tópicos culinários, compartilhe com seus amigos, salve as suas melhores receitas.',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Chef Virtual - Assistente culinário</title>
        <meta 
          name="description" 
          content='O Chef Virtual é um sistema culinário inovador projetado para auxiliar cozinheiros, sejam eles amadores ou profissionais. Nosso Chef Virtual se adapta às suas necessidades e dúvidas, tornando sua jornada culinária mais deliciosa e eficiente. Faça perguntas sobre tópicos culinários, compartilhe com seus amigos, salve as suas melhores receitas.'
        />
        <meta 
          name="keywords"
          content="Chef, Virtual, Ajuda, Cozinha, Receitas, Dicas Culinaria, Culinaria, Como fazer, Receita"
        />
      </head>
      <body className={inter.className}>
        <NextUIProvider>
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </NextUIProvider>
      </body>
    </html>
  );
}
