import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useUserAuth} from 'src/@core/context/authContext';


const PrivateRoute=({children})=>{
  const {user}=useUserAuth();
  const router = useRouter()

  useEffect(()=>{
    if(user===null){
     router.push('/pages/login')
     return null
    }
  },[user])
 
  return children
}
export default PrivateRoute;