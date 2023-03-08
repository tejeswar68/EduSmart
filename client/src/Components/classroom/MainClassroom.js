import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import CardClassroom from './CardClassroom'
import axios from 'axios';
import {authActions} from "../../store";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button} from "react-bootstrap"

const MainClassroom = () => {
  let dispatch=useDispatch();
  useEffect(()=>{
    dispatch(authActions.outHome())
  },[])
  const navigate =useNavigate();
  const [userDetails, setUserDetails] = useState();
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const[length,setlength] = useState(0);

  async function getUserDetails() {
     const {data} = await axios.get(
      `http://localhost:5000/api/${userType}/${userId}`
    );
    setUserDetails(data.user)
    setlength(data.user.classrooms.length)
    console.log(data);
  }
  
  useEffect(() => {
    getUserDetails();
  }, []);

  console.log(userDetails)
  console.log(length)
  // console.log(userDetails.classrooms);
  return (
    <div className='container'>
      <div>
      {userType === "faculty"&& length<=3 &&<Button onClick={()=>navigate("/addclass")} >Add Classroom</Button> }  
      </div>
      <Row>
        {userDetails && userDetails.classrooms.map((item,index) => (
          <Col xs={12} md={6} lg={4} key={index} >
            <CardClassroom classroomId={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MainClassroom