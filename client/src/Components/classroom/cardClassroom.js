import React, { useEffect, useState } from 'react'
import './CardClassroom.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CardClassroom = ({ classroomId }) => {
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState();
  const [faculty, setFaculty] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getFaculty(id) {
    const { data } = await axios.get(
      `https://edusmart.herokuapp.com/api/faculty/${id}`
    );
    setFaculty(data.user)
  }

  async function getClassroom(id) {
    const { data } = await axios.get(
      `https://edusmart.herokuapp.com/api/class/${id}`
    );
    setClassroom(data.class)
    setIsLoading(false)
  }

  useEffect(() => {
    getClassroom(classroomId);
  }, [])

  useEffect(() => {
    if (!isLoading) {
      getFaculty(classroom.faculties[0]);
    }
  },[isLoading])
  const handleopen = () => {
    navigate(`/mainclass/${classroom._id}`);
  }

return (
<div className='container'>
      {faculty && (classroom &&
        <div className="card m-4">
          <div className="card-header display-7">
            {classroom.title}
          </div>
          <div className="card-body">
            <h5 className="card-title">{classroom.subject}</h5>
            <p className="card-text">Start Date: {classroom.startDate}</p>
            <div className='d-flex justify-content-between align-items-center'>
              <div onClick={handleopen} className="btn btn-primary">Open</div>
              <div className='text-end '>{faculty.name}</div></div>
          </div>

        </div>)}
      
    </div>
)
}

export default CardClassroom