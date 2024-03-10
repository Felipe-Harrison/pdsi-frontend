import { getSession} from "next-auth/react";
import { hasCookie } from "cookies-next";
var cookie = require('cookie-cutter');

export const userSession = async () => {
  const session = await getSession();
  try {
    if(session) {
      return session.user;
    }
  } catch (err) {
    console.log("Error in userSession",err);
  }

};

export const isUserBase = async () => {
  const session = await getSession();
  try{
    if(session){
      return !session.user.plus;
    }
  } catch (err) {
    console.log("Error in isUserBase",err);
  }
};

export const saveUserSession = (user,psw,exp) => {
  cookie.set(
    "user",
    {user: user, password: psw},
    {
      expires: exp,
    }
  )
  console.log('salvando');
};

export const restoreSession = async () => {
  if(!hasCookie("user")) {
    console.log("Logando novamente")
  }
};

export default userSession;