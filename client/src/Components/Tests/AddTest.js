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
            const res = await axios.post(`https://edusmart.herokuapp.com/api/test/addtest`,
            {
                title:obj.title,
                description:obj.description,
                faculty : userId,
                classroom : id 
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
                              <p className='display-6 text-center m-3'>ADD-TESTS</p>
                          </div>
                          <hr />
                          {/* title */}
                          <div className="mb-3">
                              <label htmlFor="title" className='text-center mt-1 mb-1'>TITLE</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="title" className="form-control  " {...register("title", { required: true })} />
                              {/* validation error msg for title */}
                              {errors.title?.type === 'required' && <p className='text-danger'>*Title is required</p>}
                          </div>
                          {/* description */}
                          <div className="mb-3">
                              <label htmlFor="description" className='mt-3 mb-1 d-block m-auto'>DESCRIPTION</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="description" className="form-control" {...register("description", { required: true})} />
                              {/* validation error msg for description */}
                              {errors.description?.type === 'required' && <p className='text-danger'>*description is required</p>}
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