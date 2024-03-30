import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DeleteUser = ()=>{
const navigate = useNavigate()
    useEffect(()=>{
   
const postIdToDelete = "65e0690cde15e843f4912b2c";
axios.delete(`http://localhost:8085/user/deletebyid/${postIdToDelete}`)
  .then(response => {
    console.log(`Deleted post with ID ${postIdToDelete}`);
    
  })
  .catch(error => {
   // console.log(error)
    console.error(error);
    
  });
} ,[] )

}
export default DeleteUser;