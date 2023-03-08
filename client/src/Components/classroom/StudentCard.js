import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StudentCard = ({ studentId }) => {
    const [student, setStudent] = useState({});

    async function getStudent(id) {
        const { data } = await axios.get(
            `https://edusmart.herokuapp.com/api/student/${id}`
        );
        setStudent(data.user)
        console.log(data)
    }

    useEffect(() => {
        getStudent(studentId);
    }, [])

    return (
        <>
            {student &&
                <tr className='border-top mx-5'>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                </tr>}
        </>
    )
}

export default StudentCard