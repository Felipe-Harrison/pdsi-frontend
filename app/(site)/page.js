'use client';

import AuthForm from "./components/AuthForm";
import { useState } from "react";

import Cadastro from "./components/cadastro";

export default function Home() {

  const [typeAcess, setTypeAcess] = useState(true);

  function acess() {
    setTypeAcess(!typeAcess);
  }

  return(
    <div className="w-screen h-screen bg-food-pattern bg-zinc-100 flex items-center justify-center">
      <div className="
        relative
        w-11/12 h-5/6
        md:w-9/12
        bg-white
        border border-stone-100 drop-shadow-md
        rounded
        grid grid-cols-2 gap-0
      ">
        {typeAcess ? (
          <AuthForm tooglePage={() => acess()}/>
        ): (
          <Cadastro tooglePage={() => acess()}/>
        )}
      </div>
    </div>
  )
}