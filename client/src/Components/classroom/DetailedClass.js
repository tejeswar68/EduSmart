import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import detailpng from "../../images/detailpng.jpeg"
import { Row, Col } from 'react-bootstrap'
import ReactPlayer from 'react-player';
import TestCard from './TestCard';
import StudentCard from './StudentCard';

function DetailedClass() {
  const navigate = useNavigate();
  const id = useParams().id;
  const userType = localStorage.getItem("userType");
  console.log(id);
  const [classs, setClass] = useState([]);
  const sendRequest = async () => {
    const res = await axios.get(`https://edusmart.herokuapp.com/api/class/${id}`)
      .catch(err => console.log(err))
    const data = res.data;
    console.log(data.class);
    setClass(data.class);
  }
  useEffect(() => {
    sendRequest();
  }, [])
  console.log(classs);
  return (
    <div classs='display-6' style={{ color: "#324e8f" }}>
      <Row>
        <Col md={12} lg={3}>
          {userType === "faculty" && <><div onClick={() => { navigate('addstudent') }} className="btn btn-primary mx-3 my-1">Add Student</div>
            <hr /></>}
          <h1 className='text-center'>CLASS-INFO</h1>

          <p className='m-5'> CAPACITY : {classs.capacity}</p>
          <p className='m-5' >SUBJECT : {classs.subject}</p>
          <p className='m-5'>START DATE-TIME :{classs.startDate}  {classs.startTime}</p>

          <h2 className='mx-5 mt-5'>List of Students</h2>
          {classs.students &&
            <table className='mx-5 mb-5'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {classs.students.map((studentId, index) => (
                  <StudentCard studentId={studentId} key={index} />
                )
                )}
              </tbody>
            </table>}
        </Col>


        <Col sm={12} lg={6}>
          <h1 className='text-center'>{classs.title}</h1>
          <hr />
          <img src={classs.imageurl} alt="" className='w-100' />

          <h1 className='text-center'>VIDEO-LECTURE</h1>
          <hr />
          <div >
            <ReactPlayer url={classs.classurl} controls={true} />
          </div>

        </Col>


        <Col md={12} lg={3}>{userType === 'faculty' && <><div onClick={() => { navigate('addtest') }} className="btn btn-primary mx-3 my-1">Add Test</div> <hr /></>}

          <h1 className='text-center m-2'>ACTIVE-TESTS</h1>
          {classs.tests && classs.tests.map((testId, index) => (
            <Row key={index}>
              <TestCard testId={testId} />
            </Row>
          ))}
        </Col>

      </Row>



    </div>
  )
}

export default DetailedClass
