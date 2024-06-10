import {ChangeEvent, FC,useState} from 'react';
import {Paper, TextField, FormLabel, Radio, InputLabel,Button} from '@mui/material';
import {ToastContainer, toast} from 'react-toastify';
import * as YUP from 'yup'
import {useFormik} from 'formik'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AdminForm : FC = ()=>{
    const navigate = useNavigate()
    const [addHover, setAddHover] = useState('#fff')
    const [clearHover, setClearHover] = useState('rgba(132, 133, 113, 0.72)')
    const [confirmPassword, setConfirmPassword] = useState('')

    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            is_admin:false
        },
        validationSchema:YUP.object({
            username:YUP.string().required('Username is required'),
            email : YUP.string().required('Email is required'),
            password : YUP.string().required('password'),
            is_admin : YUP.boolean()

        }),
        onSubmit:(values)=>{
            const{password} = values

            if (password !== confirmPassword){
                confirmPasswordError()
                return;
            }
            const {username,email,is_admin} = values
            axios.post('http://127.0.0.1:8000/car-inventory/auth/',{
                username:username,
                email:email,
                password:password,
                is_superuser:is_admin,
            })
            .then((res)=>{console.log(res.data)})
            addSucess()
            setTimeout(()=>{
                navigate('/admin')
            },2000)
            
            
        }
    })

    const confirmPasswordError = ()=>{

        toast.error('Passwords DidNot Matched',{
            position:'top-right'
        })
    }
    const addSucess = () => {
        toast.success('User Added Sucessfully',{
            position:'top-right'
    })
    }


    return <>
    <ToastContainer/>
    
    <Paper
    elevation={4}
    sx={{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        gap:'15px',
        alignItems:'center',
        justifyContent:'center',
        padding:'20px 20px'
    }}
    onSubmit={formik.handleSubmit}
    component={'form'}
    >
        <FormLabel component={'legend'}>Add Admin</FormLabel>
        <TextField
        fullWidth
        label={'UserName'}
        variant={'outlined'}
        {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username?(<div>{formik.errors.username}</div>):null}
        <TextField 
        fullWidth
        label={'Email'}
        variant='outlined'
        type='email'
        {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>):null}
        <TextField
         fullWidth
         label={'Password'}
         variant='outlined'
         type='password'
         {...formik.getFieldProps('password')}
        
        />
        {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>):null}
        <TextField
        fullWidth
        label={'Confirm Password'}
        variant='outlined'
        type='password'
        value={confirmPassword}
        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setConfirmPassword(e.target.value)
        }}
        />

        <div 
        style={{
            width:'100%',
            display:'flex',
            alignItems:'flex-start',
            justifyContent:'flex-start',
            marginLeft:'1.5rem'
        }}
        >

            <div
            style={{
                display:'flex',
                gap:'10px',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            
            }}
            >
                  <InputLabel>Is Admin</InputLabel>
            {" : "}
            <Radio    checked={formik.values.is_admin} 
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('is_admin', e.target.checked);
    }}/>


            </div>
        </div>
        <br/>

        <div
        style={{
            width:'100%',
            display:'flex',
            alignItems:'flex-end',
            justifyContent:'flex-end',
            gap:'10px'
        }}
        >
            <Button sx={{backgroundColor:'rgba(52, 9, 137, 0.89)',width:'25%',color:`${addHover}`}}
            type='submit'
            
            onMouseEnter={()=>{
                setAddHover('#333')
            }}
            onMouseLeave={()=>{
                setAddHover('#fff')
            }}
            >Add</Button>
            <Button sx={{backgroundColor:'rgba(238, 245, 39, 0.63)',width:'25%',color:`${clearHover}`}}
            onMouseEnter={()=>{
                setClearHover('#333')
            }}
            onMouseLeave={()=>{
                setClearHover('rgba(132, 133, 113, 0.72)')
            }}
            onClick={()=>{
                formik.resetForm()
                setConfirmPassword(()=>"")
            }}
            >Clear</Button>
         

        </div>
       
        

        
    
    </Paper>
    </>
}


export default AdminForm;


