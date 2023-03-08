import Faculty from "../model/Faculty";
import Test from "../model/Test";
import Class from "../model/Class";
import mongoose from "mongoose";
import Question from "../model/Question.js";

export const getAllTests = async(req,res,next)=>
{
    let Tests;
    try {
        Tests = await Test.find();
    } catch (error) {
        return console.log(error);
    }
    if(!Tests)
    {
        return res.status(404).json({message:"No Tests Found!"});
    }
    return res.status(200).json({Tests});
}

export const getTestById = async(req,res,next)=>
{
    const id = req.params.id;

    let tests;

    try {
        tests = await Test.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!tests)
    {
        return res.status(404).json({message:"NO TEST FOUND!"});
    }
    return res.status(200).json({test:tests});
}



export const addTest = async (req,res,next)=>
{
   const {title,description,classroom,faculty} = req.body;

   let existingFaculty , existingClassroom;
   try {
    existingFaculty = await Faculty.findById(faculty);
    existingClassroom = await Class.findById(classroom);
   } catch (error) {
    return response.status(404).json({message:"Classroom or Faculty is not present"})
   }
   if(!existingFaculty)
   {
    return response.status(400).json({message :"Unable to Find Faculty By this Id"});
   }
   if(!existingClassroom)
   {
    return response.status(401).json({message :"Unable to Find Classroom By this Id"});
   }
   const test = new Test({
    title,
    description,
    faculty,
    classroom,
    students:[],
    questions:[]
   });

   try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await test.save({session});
    existingFaculty.tests.push(test._id)
    existingClassroom.tests.push(test._id)
    await existingClassroom.save({session});
    await existingFaculty.save({session});
    await session.commitTransaction();
    } catch (error) {
        return res.status(500).json({message:"Internal server Error!"});
    }
    return res.status(200).json({test});
}

export const addQuestion = async (req, res, next) => {
    const { question, option1, option2, option3,option4,correct,testid } = req.body;
    let existingTest;
    try {
      existingTest = await Test.findById(testid);
    } catch (err) {
      return console.log(err);
    }
    if (!existingTest) {
      return res.status(400).json({ message: "Unable To Find Test By This ID" });
    }
    const ques = new Question({
      quest:question,
      option1,
      option2,
      option3,
      option4,
      correct

    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await ques.save({ session });
      existingTest.questions.push(ques);
      await existingTest.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error!" });
    }
  
    return res.status(200).json({ question : ques });
  };