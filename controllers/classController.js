import Class from "../model/Class.js";
import Faculty  from "../model/Faculty.js";
import Student from "../model/Student.js";
import mongoose from "mongoose";

export const getAllClasses = async(req,res,next)=>
{
    let classes;
    try {
        classes = await Class.find();
    } catch (error) {
        return console.log(error);
    }
    if(!classes)
    {
        return res.status(400).json({message:"No Classes Found!"});
    }
    return res.status(200).json({classes});
}
export const getClassById = async(req,res,next)=>
{
    const id = req.params.id;

    let classs;

    try {
        classs = await Class.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!classs)
    {
        return res.status(404),json({message:"NO CLASS FOUND!"});
    }
    return res.status(200).json({class:classs});
}

export const addClass = async (req,res,next)=>
{
    const {title,subject, startDate,capacity,imageurl,classurl} = req.body;
    const facultyid = req.params.id;

    let existingFaculty;

    try {
        existingFaculty = await Faculty.findById(facultyid);
    } catch (error) {
        return console.log(error);
    }
    if(!existingFaculty)
    {
        return res.status(400).json({message :"Unable to Find Faculty By this Id"});
    }
    const classs = new Class({
        title,
        subject,
        startDate,
        capacity,
        imageurl,
        classurl,
        students:[],
        faculties:[],
        tests : []
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        classs.faculties.push(facultyid);
        await classs.save({session});
        existingFaculty.classrooms.push(classs._id);
        await existingFaculty.save({session});
        await session.commitTransaction();
    } catch (error) {
        return res.status(500).json({message:"Internal server Error!"});
    }
    return res.status(200).json({class:classs});
}

export const addStudent = async (req,res,next)=>
{
   const {emailid} = req.body;
    const classId = req.params.id;


    let existingClass ,existingStudent,enrolledStudent;
    try {
        existingClass = await Class.findById(classId);
        existingStudent = await Student.findOne({email:emailid});
        if(existingStudent)
            enrolledStudent = existingStudent.classrooms.includes(classId);
        
      
    } catch (error) {
        return console.log(error);
    }

    if(existingClass.students.length>=existingClass.capacity)
    {
        return res.status(404).json({message:"STUDYSESSION CAPACITY IS FULL"})
    }
    else if(enrolledStudent)
    {
        return res.status(400).json({message:"ALREADY ENROLLED TO THE COURSE!"})
    }
  
    try
    {
        const session = await mongoose.startSession();
        session.startTransaction();
        existingClass.students.push(existingStudent._id);
        await existingClass.save({session});
        existingStudent.classrooms.push(classId);
        await existingStudent.save({session});
        await session.commitTransaction();
    }
    catch(err)
    {
        return res.status(500).json({message:"Internal server error!"});
    }
    return res.status(200).json({message:"SUCCESFULLY ENROLLED INTO THE COURSE!"});
}