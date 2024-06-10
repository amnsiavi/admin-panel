import {useState,useEffect} from 'react';
import Instance from '../apis';

interface FormData{
    username : string,
    password : string,
}


const useUserAuth = (formData:FormData)=>{
    const [allow,setAllow] = useState(false)

    useEffect(()=>{

        Instance.post('auth/login/',JSON.stringify(formData))
        .then((res)=>{
            console.log('Results',res)
            if (res.data.auth){
                setAllow((prev:boolean)=>!prev)
            }
        })

    },[])

    return {
        allow
    }




}

export default useUserAuth;