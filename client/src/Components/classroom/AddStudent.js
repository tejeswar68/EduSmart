import axios from 'axios';
import React from 'react'
import {Row,Col,Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import addsession from '../../images/addsession.jpg';
import useButtonLoader from '../useButtonLoader';

function AddTest() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[createButton,isLoading] = useButtonLoader("Create","Creating...")
    // var date = new Date();
    const id = useParams().id;
    console.log(id);
    const onFormSubmit = (obj)=>
    {


        const sendRequest = async()=>
        {
            isLoading(true);
            var userId = localStorage.getItem("userId")
            const res = await axios.post(`https://edusmart.herokuapp.com/api/class/addstudent/${id}`,
            {
                emailid : obj.emailid
            })
            .catch(err=>isLoading(false))
            const data = res.data;
            console.log(data);
            return data;
        }
        sendRequest()
        .then(()=>isLoading(false))
        .then(()=>navigate("/"));
    }
  return (
   
    <div>
    <Row>
        <Col sm={12} md={10} className='mx-auto mt-5 mb-4'>
        <form className=' bg-opacity-0 text-light rounded-3' style={{boxShadow:'10px 10x 10px orange',backgroundColor:'#a17ff5',border:"#a17ff5"}} onSubmit={handleSubmit(onFormSubmit)} >
                      <Row>
                      <Col xs={12} md={6}><img src={addsession} className='w-100' alt="" srcset="" /></Col>
                      <Col xs={12} md={6} className='p-4'>
                      <div>
                              <p className='display-6 text-center m-3'>ADD-STUDENTS</p>
                          </div>
                          <hr />
                          {/* title */}
                          <div className="mb-3">
                              <label htmlFor="emailid" className='text-center mt-1 mb-1'>Email of Student</label>
                              <input type="email" style={{ borderRadius: '15px' }} id="emailid" className="form-control  " {...register("emailid", { required: true })} />
                              {/* validation error msg for emailid */}
                              {errors.emailid?.type === 'required' && <p className='text-danger'>*Emailid is required</p>}
                          </div>
                         
                          {/* submit button */}
                          <div className='mb-1 text-center'>
                              <Button type='submit' ref={createButton} variant='primary' size="lg">Create</Button>
                          </div>

                         
                      </Col>
                      </Row>
                      </form>
        </Col>
    </Row>
  </div>
  )
}

export default AddTest