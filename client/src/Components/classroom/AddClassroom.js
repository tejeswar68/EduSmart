import axios from 'axios';
import React from 'react'
import {Row,Col,Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import addsession from '../../images/addsession.jpg';
import useButtonLoader from '../useButtonLoader';



function AddClassroom() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[createButton,isLoading] = useButtonLoader("Create","Creating...")
    // var date = new Date();
    const onFormSubmit = (obj)=>
    {

        const sendRequest = async()=>
        {
            isLoading(true);
            var userId = localStorage.getItem("userId")
            const res = await axios.post(`https://edusmart.herokuapp.com/api/class/addclass/${userId}`,
            {
                title:obj.title,
                subject:obj.subject,
                startDate:"12",
                capacity:obj.capacity,
                imageurl:obj.imageurl,
                classurl : obj.classurl

            })
            .catch(err=>isLoading(false))
            const data = res.data;
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
                              <p className='display-6 text-center m-3'>CREATE-CLASSROOM</p>
                          </div>
                          <hr />
                          {/* title */}
                          <div className="mb-3">
                              <label htmlFor="title" className='text-center mt-1 mb-1'>TITLE</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="title" className="form-control  " {...register("title", { required: true })} />
                              {/* validation error msg for title */}
                              {errors.title?.type === 'required' && <p className='text-danger'>*Title is required</p>}
                          </div>
                          {/* subject */}
                          <div className="mb-3">
                              <label htmlFor="subject" className='mt-3 mb-1 d-block m-auto'>SUBJECT</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="subject" className="form-control" {...register("subject", { required: true})} />
                              {/* validation error msg for subject */}
                              {errors.subject?.type === 'required' && <p className='text-danger'>*subject is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="imageurl" className='mt-3 mb-1 d-block m-auto'>IMAGE URL</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="imageurl" className="form-control" {...register("imageurl", { required: true})} />
                              {/* validation error msg for imageurl */}
                              {errors.imageurl?.type === 'required' && <p className='text-danger'>*imageurl is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="classurl" className='mt-3 mb-1 d-block m-auto'>VIDEO LECTURE URL</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="classurl" className="form-control" {...register("classurl", { required: true})} />
                              {/* validation error msg for classurl */}
                              {errors.classurl?.type === 'required' && <p className='text-danger'>*classurl is required</p>}
                          </div>
                        
                          
                           {/* capacity */}
                           <div className="mb-3">
                              <label htmlFor="capacity" className='mt-1 mb-1 d-block m-auto'>Capacity</label>
                              <input type="number" style={{ borderRadius: '15px' }} id="capacity" className="form-control" {...register("capacity", { required: true,max:60})} />
                              {/* validation error msg for capacity */}
                              {errors.capacity?.type === 'required' && <p className='text-danger'>*capacity is required</p>}
                              {errors.capacity?.type === 'max' && <p className='text-white'>*Maximum capacity is 60</p>}
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

export default AddClassroom