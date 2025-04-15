import React from 'react'
import Card from 'react-bootstrap/Card';
import { FaHeart } from 'react-icons/fa';
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Postcard({caption, username, picture, image}) {
    const [bcolor,setcolor]=useState(false)
    const change =()=>{
          setcolor(!bcolor);
    }
  return (
    <>
     <Card style={{ width: '14rem',height:"21rem",padding:"7px" ,gap:"3px"}}>
      <div className='top' style={{display:"flex",alignItems:"center",gap:"5px"}}>
        <Link to={`/profile/${username}`}>
        <img src={picture} style={{width:"35px",height:"35px",borderRadius:"50%"}} alt=""/>
        </Link>
        
        <p style={{fontWeight:"800",color:"rgb(17, 45, 78)",letterSpacing:"2px"}}>{username}</p></div>
      <Card.Img variant="top" src={image} style={{width:"13rem",height:"13rem",objectFit: "cover", borderRadius: "8px"}}/>
      <Card.Body>
        <Card.Text style={{fontSize:"13px"}}>
          {caption}
        </Card.Text>
        <div style={{display:"flex",flexDirection:"row",gap:"10px",cursor:"pointer"}}>
            <FaHeart onClick={change} style={{color:bcolor?"red":"gray"}}/>
            <FaRegComment/>
            <IoShareSocialOutline/>
        </div>
      </Card.Body>
    </Card>
    </>
  )
}
export default Postcard
