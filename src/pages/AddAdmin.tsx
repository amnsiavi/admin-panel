import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios'
import Animation from '../components/admin/Animation';
import { RiUserAddFill } from "react-icons/ri";
import { FaBan } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import {ToastContainer, toast} from 'react-toastify'
import AdminConformation from '../components/admin/AdminConformation';
import {useNavigate} from 'react-router-dom';
import AdminForm from '../components/admin/AdminForm';

interface Users {
  [key: string]: JSX.Element;
}


const drawerWidth = 240;


export default function AdminAdmin() {
  
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [data,setData] = React.useState<any>({
    apiData:null
  })
  const [id, setID] = React.useState<any>(null)
  const [reload,setReload] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
 

  const handleDeleteModalOpen = ()=>{

    setDeleteOpen(true)
  }
  const handleDeleteModalClose = ()=>{
    setDeleteOpen(false)
  }

  const users :Users= {
    User:<RiUserAddFill size={27} style={darkMode?{color:'#fff'}:{color:'green'}} title='Add User' /> ,
    Edit:<FaUserEdit size={27} style={darkMode?{color:'#fff'}:{color:'yellow'}} title='Edit User' /> ,
    Banned:<FaBan size={27} style={darkMode?{color:'#fff'}:{color:'red'}} title='Ban User' /> ,

  }

  console.log('USER ID',id)

  React.useEffect(()=>{
    axios.get('http://127.0.0.1:8000/car-inventory/auth/')
    .then((res)=>{
        setData({...data,['apiData']:res.data})
    })

  },[reload])

  const deletionError = ()=>{
    toast.error('Deletion Failed',{
      position:'top-right'
    })
  }
  const deletionSucess = ()=>{
    toast.success('Deletion Sucessful',{
      position:'top-right'
    })
  }

  const handleDelete = async (id:number)=>{

    axios.delete(`http://127.0.0.1:8000/car-inventory/auth/del/${id}`)
    .then(()=>{
        setReload((prev:boolean)=>!prev)
        deletionSucess()
    })
    .catch(()=>{
      console.log('Deletion Gone Wrong')
      deletionError()
    })
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const drawer = (
    <div style={darkMode ? {
        backgroundColor:'#333',
        height:'200vh',
    }:{}}>
         <div
      style={{
        width:'100%',
        backgroundColor:'rgba(52, 9, 137, 0.89)',
        color:'#fff',
        height:'25vh',
        padding:'12px 12px'
      }}
      ><h2 style={{
        fontWeight:600
      }}>CarWiz inc.</h2>
      <br/>

      <div style={{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Animation/>
      </div>
      
      
      
      </div>
      <Toolbar />
      <Divider sx={darkMode?{backgroundColor:'#fff'}:{}}/>
      <ListItemButton onClick={toggleDarkMode} sx={{ position: 'absolute', bottom: '50px' }}>
        <ListItemIcon>
          {darkMode ? <Brightness7Icon sx={darkMode ? {color:'#fff'}:{}}/> : <Brightness4Icon sx={darkMode ?{color:'#fff'}:{}}/>}
        </ListItemIcon>
        <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'}  sx={darkMode ? {color:'#fff'}:{}}/>
      </ListItemButton>
    </div>
  );

  return (
    <>
    <AdminConformation open={deleteOpen} handleClose={()=>{handleDeleteModalClose()}} id={id} handleDelete={handleDelete} setReload={setReload}/>
    <Box sx={{ display: 'flex', }}>
      <ToastContainer/>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          
          }}
      >
        <Toolbar sx={{ backgroundColor: 'rgba(52, 9, 137, 0.89)' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Car Inventory Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor:'' }}
        aria-label="mailbox folders"
        
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
          
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={darkMode ? { flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`,
        
        backgroundColor:'#333',height:'200vh' } }:{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`,} }}
        
      >
        <Toolbar />
       <AdminForm/>
        
      </Box>
    </Box>
    </>
  );
}