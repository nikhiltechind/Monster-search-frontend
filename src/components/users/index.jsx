import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState} from 'react';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alertbox from './alert';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BasicModal from './alert';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/redux/action/signup.action';
import { showModal } from '../../redux/redux/action/showmodal.action';
import { userID } from '../../redux/redux/action/updateid.action';
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables() {
 const navigate = useNavigate()
  const dispatch = useDispatch();
   const togg= useSelector(state=> state.user.showmodal)

  const [reload,setreload] = useState(false);
 
 
  useEffect(()=>{
    const fetched=fetchuser();
    
  },[reload])

const fetchuser = async ()=>{
    const res=await fetch("http://localhost:8085/user/getusers");
    const resjson = await res.json();
   // setusers(resjson);
     dispatch(signupUser(resjson))

    console.log(resjson);
    return resjson;
}
 function deleteconfirm(id){
  
  let res=window.confirm("are you sure you want to delete")
  if(res){
     funcdel(id)
  }
}
 const  funcdel=async (id)=>{
 console.log("called")
 try{
  console.log(`http://localhost:8085/user/deletebyid/`+id)
   const response= await axios.delete(`http://localhost:8085/user/deletebyid/`+id)
   console.log(`http://localhost:8085/user/deletebyid/`+id)
   
     console.log(response)
    
    setreload(!reload)
  
    }
    //.catch(error => {
     catch(error){
      console.error(error);
      //alert("error")
  // navigate("login")
    }
   }

  const monsters=useSelector(state=>state.user.monsters)
  console.log(monsters)

  return (
    
   <div>
     {togg && <BasicModal/>} 
  
    <TableContainer component={Paper}>
       
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Object Id</StyledTableCell>
            <StyledTableCell align="right">User Id</StyledTableCell>
            <StyledTableCell align="right">username</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Password</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monsters.map((itr) => (
            <StyledTableRow key={itr?.userid}>
              <StyledTableCell component="th" scope="row">
                {itr?.id}
              </StyledTableCell>
              <StyledTableCell align="right">{itr?.userid}</StyledTableCell>
              <StyledTableCell align="right">{itr?.username}</StyledTableCell>
              <StyledTableCell align="right">{itr?.email}</StyledTableCell>
              <StyledTableCell align="right">{itr?.password}</StyledTableCell>
              
              <StyledTableCell align="right"><Button color="success" variant="outlined" onClick={()=>{
                  dispatch(userID(itr))
                  dispatch(showModal(true))
              }}><EditIcon/></Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant="outlined" color="error" onClick={()=>{
                
                console.log("omago")
                deleteconfirm(itr.id)
              }
                }><DeleteIcon/></Button></StyledTableCell>
             

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
  
    </div>
  );
}