
import { createContext, useState, ReactNode, useContext,useEffect } from 'react'

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {useRouter} from 'next/router';
import { auth } from '../../firebase/firebase';

// **Define value Datatype
type AuthContextValue = {
  count: number;
  increment: () => void;
};

// ** Create Context
 const AuthContext = createContext<AuthContextValue>()


 const AuthProvider:React.FC = ({ children }: { children: ReactNode }) => {
  // ** State
  const [user,setUser]=useState<State>(null)
const router=useRouter();
  // **Signup
  const signUp:any=(email,password)=>{
       return createUserWithEmailAndPassword(auth,email,password)
  }

  // **Login
  const logIn:any=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
  }
  
  const logoutHandler=()=>{
    localStorage.removeItem('token')
    router.push('/pages/login')
    
  }
useEffect(()=>{
  const unSubscribe=onAuthStateChanged(auth,(createUser)=>{
    setUser(unSubscribe);
  })
  return ()=>{
unSubscribe();
  }
},[]);

useEffect(()=>{
  const token=localStorage.getItem('token')
},[])
  return <AuthContext.Provider value={{logoutHandler,user, signUp, logIn}}>{children}</AuthContext.Provider>
}

const useUserAuth=()=>useContext(AuthContext);
export {useUserAuth,AuthProvider}
