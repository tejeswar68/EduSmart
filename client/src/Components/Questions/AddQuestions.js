import axios from 'axios';
import React from 'react'
import {Row,Col,Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import addsession from '../../images/addsession.jpg';
import useButtonLoader from '../useButtonLoader';

function AddQuestions() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[createButton,isLoading] = useButtonLoader("Create","Creating...")
    // var date = new Date();
    const id = useParams().testid;
    console.log(id);
    const onFormSubmit = (obj)=>
    {

        // console.log(obj);
        const sendRequest = async()=>
        {
            isLoading(true);
            var userId = localStorage.getItem("userId")
            const res = await axios.post(`https://edusmart.herokuapp.com/api/test/addquestion`,
            {
                question:obj.question,
                option1 : obj.option1,
                option2 : obj.option2,
                option3 : obj.option3,
                option4 : obj.option4,
                correct : obj.correct,
                testid : id

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
        <form  className=' bg-opacity-0 text-light rounded-3' style={{boxShadow:'10px 10x 10px orange',backgroundColor:'#a17ff5',border:"#a17ff5"}} onSubmit={handleSubmit(onFormSubmit)} >
                      <Row>
                      <Col xs={12} md={6}><img src={addsession} className='w-100' alt="" srcset="" /></Col>
                      <Col xs={12} md={6} className='p-4'>
                      <div>
                              <p className='display-6 text-center m-3'>ADD-QUESTIONS</p>
                          </div>
                          <hr />
                          {/* question */}
                          <div className="mb-3">
                              <label htmlFor="question" className='text-center mt-1 mb-1'>Question</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="question" className="form-control  " {...register("question", { required: true })} />
                              {/* validation error msg for question */}
                              {errors.question?.type === 'required' && <p className='text-danger'>*question is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="option1" className='text-center mt-1 mb-1'>option1</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="option1" className="form-control  " {...register("option1", { required: true })} />
                              {/* validation error msg for option1 */}
                              {errors.option1?.type === 'required' && <p className='text-danger'>*option1 is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="option2" className='text-center mt-1 mb-1'>option2</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="option2" className="form-control  " {...register("option2", { required: true })} />
                              {/* validation error msg for option2 */}
                              {errors.option2?.type === 'required' && <p className='text-danger'>*option2 is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="option3" className='text-center mt-1 mb-1'>option3</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="option3" className="form-control  " {...register("option3", { required: true })} />
                              {/* validation error msg for option3 */}
                              {errors.option3?.type === 'required' && <p className='text-danger'>*option3 is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="option4" className='text-center mt-1 mb-1'>option4</label>
                              <input type="text" style={{ borderRadius: '15px' }} id="option4" className="form-control  " {...register("option4", { required: true })} />
                              {/* validation error msg for option4 */}
                              {errors.option4?.type === 'required' && <p className='text-danger'>*option4 is required</p>}
                          </div>
                          <div className="mb-3">
                              <label htmlFor="correct" className='text-center mt-1 mb-1'>Enter the correct option number:</label>
                              <input type="number" style={{ borderRadius: '15px' }} id="correct" className="form-control  " {...register("correct", { required: true ,min:1,max:4})} />
                              {/* validation error msg for correct */}
                              {errors.correct?.type === 'required' && <p className='text-danger'>*correct option is required</p>}
                              {errors.correct?.type === 'min' && <p className='text-danger'>*Min option number is 1</p>}
                              {errors.correct?.type === 'max' && <p className='text-danger'>*Max option number is 4</p>}
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

export default AddQuestions