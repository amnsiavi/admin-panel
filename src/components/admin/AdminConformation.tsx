import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface AdminConformationPropTypes{

    handleClose : () => void
    open:boolean,
    id : number,
    handleDelete : (id:number)=> Promise<void>,
    setReload : React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdminConformation({open, handleClose, handleDelete,id,setReload}:AdminConformationPropTypes) {

    const [yes, setYes] = React.useState('#fff')
    const [cancel, setCancel] = React.useState('#fff')

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h6" component="h2">
            Are You Sure ?
          </Typography>
        <br/>
        <br/>
          <div style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:'14px'
          }}>
            <Button onMouseEnter={()=>{
                setYes('#333')
            }}
            onMouseLeave={()=>{
                setYes('#fff')
            }}
            onClick={async ()=>{
                await handleDelete(id)
                setReload((prev:boolean)=>!prev)
                handleClose()
            }}
            variant='outlined' sx={{backgroundColor:'green',color:`${yes}`}}>Yes</Button>
            <Button variant='outlined' sx={{backgroundColor:'red',color:`${cancel}`}}
            onMouseEnter={()=>{
                setCancel('#333')
            }}
            onMouseLeave={()=>{
                setCancel('#fff')
            }}
            onClick={handleClose}
            >Cancel</Button>

          </div>
        </Box>
      </Modal>
    </div>
  );
}