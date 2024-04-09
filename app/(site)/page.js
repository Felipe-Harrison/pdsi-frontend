'use client';

import { useState } from "react";

import LoginForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";

export default function Home() {

  const [typeAccess, setTypeAccess] = useState(true);

  function toggleTypeAccess() {
    setTypeAccess(!typeAccess);
  }

  return(
    <div className="w-screen h-screen bg-food-pattern bg-orange md:bg-zinc-100 flex items-center justify-center">
      <div className="
        relative
        h-11/12 
        w-11/12 md:w-9/12
        md:grid grid-cols-2 gap-0
        bg-white
        drop-shadow-md rounded
      ">
        {typeAccess ? (
          <LoginForm tooglePage={() => toggleTypeAccess()}/>
        ): (
          <RegisterForm tooglePage={() => toggleTypeAccess()}/>
        )}
      </div>
    </div>
  )
}