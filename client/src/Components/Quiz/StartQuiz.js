import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Quiz.css';


function StartQuiz() {
    // const testId = useParams().testid;
    // const [test, setTest] = useState([]);
    // const [questions,setQuestions] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // async function getTest(id) {
    //     const { data } = await axios.get(
    //         `https://edusmart.herokuapp.com/api/test/${id}`
    //     );
    //     setTest(data.test.questions)
    //     setIsLoading(true)
    //     console.log(data.test.questions)
    // }


    // useEffect(() => {
    //     getTest(testId);
    // }, [])

    // async function getQuestions(id) {
    //     const { data } = await axios.get(
    //         `https://edusmart.herokuapp.com/api/quest/${id}`
    //     );
    //     setQuestions(data)
    //     console.log(data)
    // }

    // useEffect(()=>{
    //     test
    // },[])
    // const loadintoarray = async () => {

    // }



    var Questionbank = [
        {
            Question: "What is the capital of India?",
            Answers: [
                { Answer: "Delhi", isCorrect: true },
                { Answer: "Pune", isCorrect: false },
                { Answer: "Ranchi", isCorrect: false },
                { Answer: "Patna", isCorrect: false }
            ]
        },
        {
            Question: "Who is the PM of India?",
            Answers: [
                { Answer: "Amit Shah", isCorrect: false },
                { Answer: "Narendra Modi", isCorrect: true },
                { Answer: "Raga", isCorrect: false },
                { Answer: "Kejri", isCorrect: false }
            ]
        }, {
            Question: "2 +3 = ?",
            Answers: [
                { Answer: "5", isCorrect: true },
                { Answer: "7", isCorrect: false },
                { Answer: "4", isCorrect: false },
                { Answer: "3", isCorrect: false }
            ]
        },
        {
            Question: "What comes after january?",
            Answers: [
                { Answer: "feb", isCorrect: true },
                { Answer: "march", isCorrect: false },
                { Answer: "june", isCorrect: false },
                { Answer: "sept", isCorrect: false }
            ]
        },

    ]

    //useState Hook
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerResponse = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < Questionbank.length) {
            setCurrentQuestion(nextQuestion);
        }
        else {
            setShowScore(true);
        }
    }

    // const resetQuiz = () => {
    //     setCurrentQuestion(0);
    //     setScore(0);
    //     setShowScore(false);
    // }
    return (
        <div className='comp bodyy' >
            {showScore ? (
                <Col md={4} sm={12} className='mt-5 display-6 text-white'>
                    You have scored {score} out of {Questionbank.length}!
                    <br />
                </Col>
            )
                : (


                    <Col md={4} sm={12} className='border p-5 border-warning rounded m-5 text-warning glassbg'>
                        <p><span className='display-6'>{currentQuestion + 1}.{Questionbank[currentQuestion].Question}</span> </p>
                        <hr />

                        <div >
                            {Questionbank[currentQuestion].Answers.map((answer) =>
                            (
                                <>
                                    <Button variant='outline-warning' className='m-2 w-75' onClick={() => handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</Button>
                                    <br />
                                </>

                            ))}
                        </div>

                    </Col>



                )
            }

        </div>
    )
}

export default StartQuiz

