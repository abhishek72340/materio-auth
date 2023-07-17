import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useUserAuth} from 'src/@core/context/authContext';


const ProtectedRoute=({children})=>{
  const {user}=useUserAuth();
  const router = useRouter()

  useEffect(()=>{
    if(user===null){
     router.push('/pages/login')
     return null
    }
  },[user,router])
 
  return children
}
export default ProtectedRoute;