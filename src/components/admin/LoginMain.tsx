import { FC,useState} from 'react';
import {Paper,TextField, Typography,InputAdornment,IconButton,Button} from '@mui/material';
import {Visibility,VisibilityOff,Person} from '@mui/icons-material'
import img from '../../assets/log-main.jpg'
import {ToastContainer,toast} from 'react-toastify'
import {useFormik} from 'formik';
import * as YUP from 'yup'
import {useNavigate} from 'react-router-dom';


import Instance from '../../apis';




interface FormDataType{

    username : string,
    password : string
}



const Sucess = () =>{
    toast.success('Login Sucessful',{
        position:'top-right'
    })
}


const LoginMain : FC = ()=>{
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema:YUP.object({
            username:YUP.string().required('Email is required'),
            password:YUP.string().required('Password is required'),
        }),
        onSubmit : (values:FormDataType)=> {
            const {username,password} = values
            console.log('Username',username.trim())
            Instance.post('auth/login',JSON.stringify({
                username:username.replace(/\s+/g, ''),
                password:password.replace(/\s+/g, '')
            }))
            .then((res)=>{
             const {auth} = res.data;
             if (auth){
                Sucess()
                formik.resetForm()
                navigate('/admin')

             }else{
                console.log(res.data)
                toast.error(`Login Failed`,{
                    position:'top-right'
                })
             }
            })
            .catch((err)=>{
             console.log('Errors',err.response.data)
             })
           
        }
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginHover,setLoginHover] = useState<boolean>(false)
    const [registerHover,setRegisterHover] = useState<boolean>(false)

   

    const toggle = ()=>{
        setShowPassword(!showPassword)
    }
    

    return (
        <>
        <ToastContainer/>
        <Paper className='co-admin-login-main'
        sx={{boxShadow:'0 0 10px rgba(255, 255, 255, 0.5)',
            borderRadius:'10px'
        }}
        component={'form'}
        onSubmit={formik.handleSubmit}
        >
            <div
            style={{
                flex:'1',display:'flex',
                flexDirection:'column',
                width:'100%'
            }}
            >
                <div
                style={{
                    width:'100%',
                    padding:'25px 25px'
                }}
                >
                    <Typography sx={{
                        fontWeight:'700',
                        fontSize:'30px',color:'rgba(52, 9, 137, 0.89)'
                    }} variant='h5' gutterBottom>Admin Panel</Typography>
                    <br/>
                    <div style={{
                        width:'100%',
                        display:'flex',
                        flexDirection:'column',
                        gap:'15px'
                    }}>
                        <TextField
                        {...formik.getFieldProps('username')}
                        name='username' 
                        placeholder='username'
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position='start'>
                                    <Person sx={{color:'rgba(52, 9, 137, 0.89)'}}/>
                                </InputAdornment>
                            )
                        }}
                        
                        
                        
                        />
                        {formik.touched.username && formik.errors.username ? 
                        (<div>{formik.errors.username}</div>) : null
                        }
                        <TextField
                        placeholder='password'
                        {...formik.getFieldProps('password')}
                        name='password'
                        type={showPassword ? 'text':'password'}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position='end'>
                                    <IconButton onClick={toggle}>
                                        {showPassword? <Visibility sx={{color:'rgba(52, 9, 137, 0.89)'}}/> : <VisibilityOff sx={{color:'rgba(52, 9, 137, 0.89)'}}/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        
                        
                        />
                        {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
        )               : null}

                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{
                        width:'100%',
                        display:'flex',
                        gap:'10px',
                    }}>
                        <Button variant='outlined' fullWidth sx={loginHover ? {
                            backgroundColor:'rgba(52, 9, 137, 0.89)',
                            color:'rgba(52, 9, 137, 0.89)',fontWeight:'600'
                        }:{
                            backgroundColor:'rgba(52, 9, 137, 0.89)',
                            color:'#fff',fontWeight:'600'
                        }}
                        onMouseEnter={()=>{
                           setLoginHover((prev:boolean)=>!prev)
                        }}
                        onMouseLeave={()=>{
                            setLoginHover((prev:boolean)=>!prev)
                        }}
                        type='submit'
                        
                        >Login</Button>
                        <Button variant='outlined' fullWidth sx={registerHover? {
                            backgroundColor:'rgba(52, 9, 137, 0.89)',
                            color:'rgba(52, 9, 137, 0.89)',fontWeight:'600'
                        }:{
                            backgroundColor:'rgba(52, 9, 137, 0.89)',
                            color:'#fff',fontWeight:'600'
                        }}
                        onMouseEnter={()=>{
                           setRegisterHover((prev:boolean)=>!prev)
                        }}
                        onMouseLeave={()=>{
                            setRegisterHover((prev:boolean)=>!prev)
                        }}>Register</Button>

                    </div>
                </div>
            </div>
            <div style={{
                flex:1,backgroundImage:`url('${img}')`,
                backgroundSize:'cover'
            }}/>

        </Paper>
        
        
        </>
    )
}
export default LoginMain;