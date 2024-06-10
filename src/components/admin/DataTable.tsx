import {FC} from 'react'
import {
    Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@mui/material';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";



interface DataType{
    id : number,
    username:string,
    email:string,
    password:string,
    is_superuser:boolean
}


interface DataTablePropTypes{
    darkMode:boolean,
    setId:React.Dispatch<React.SetStateAction<any>>
    data:{
        data:DataType[]
    },
    handleOpen : ()=> void,
}



const DataTable : FC<DataTablePropTypes> = ({darkMode,data,setId, handleOpen}:DataTablePropTypes)=>{

   


    


    return <>
    
    <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="simple table">
            <TableHead sx={darkMode?{backgroundColor:'rgba(93, 75, 84, 0.8)'}:{}}>
                <TableRow>
                    <TableCell align='center' sx={darkMode?{color:'#fff'}:{}}>ID</TableCell>
                    <TableCell align='center' sx={darkMode?{color:'#fff'}:{}}>Username</TableCell>
                    <TableCell align='center' sx={darkMode?{color:'#fff'}:{}}>Email</TableCell>
                    <TableCell align='center' sx={darkMode?{color:'#fff'}:{}}>Is_Admin</TableCell>
                    <TableCell align='center' sx={darkMode?{color:'#fff'}:{}}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                data?.data.map((data:DataType,index:number)=>(  <TableRow key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align='center'>
                {data.id}
              </TableCell>
              <TableCell align="center">{data.username}</TableCell>
              <TableCell align="center">{data.email}</TableCell>
              <TableCell align="center">
                <div style={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    {data.is_superuser?<MdAdminPanelSettings size={50}
                    style={{
                        color:'rgba(52, 9, 137, 0.89)'
                    }}
                    title='Admin User'
                    />:<FaUser size={50}
                    style={{
                        color:'rgba(52, 9, 137, 0.89)'
                    }}
                    title='Guest User'
                    />}
                
                </div>
                
                </TableCell>
                <TableCell>
                    <div style={{
                          width:'100%',
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center'
                    }}>
                        <ImCross size={25} style={{
                            color:'red'
                        }} title='Delete User'
                        
                        onClick={()=>{
                            setId(()=>data.id)
                            handleOpen()
                            
                        }}
                        />
                      

                    </div>

                </TableCell>
                </TableRow>))
              }

            </TableBody>

        </Table>
    </TableContainer>
    </>
}

export default DataTable;



