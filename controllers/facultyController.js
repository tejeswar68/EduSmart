import Faculty from "../model/Faculty.js";
import bcrypt from "bcryptjs";

export const getAllFaculties = async(req,res,next)=>
{
    let Faculties;
    try {
        Faculties = await Faculty.find();
    } catch (error) {
        return console.log(error);
    }
    if(!Faculties)
    {
        return res.status(400).json({message:"No Faculties Found!"});
    }
    return res.status(200).json({Faculties});
}
export const getFacultyById = async(req,res,next)=>
{
    const id = req.params.id;

    let faculty;

    try {
        faculty = await Faculty.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!faculty)
    {
        return res.status(404),json({message:"NO FACULTY FOUND!"});
    }
    return res.status(200).json({user:faculty});
}

export const Signup = async(req,res,next)=>
{
    const {name,email,password} = req.body;
    let existingFaculty;

    try
    {
        existingFaculty = await Faculty.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }
    if(existingFaculty)
    {
        res.status(400).json({message : "Faculty Already Exists!"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const faculty = new Faculty({
        name,
        email,
        password:hashedPassword,
        classrooms:[],
        tests : []

    });
    try
    {
        await faculty.save();
    } 
    catch(err)
    {
        return res.status(404).json({message:"faculty Creation Failed!"});
    }
    return res.status(201).json({user:faculty});
}
export const login = async(req,res,next)=>
{
    const{email,password} = req.body;

    let existingFaculty;

    try {
        existingFaculty =await Faculty.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(!existingFaculty)
    {
        return res.status(404).json({message:"Faculty Not Found!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingFaculty.password);

    if(!isPasswordCorrect)
    {
        return res.status(404).json({message:"Incorrect Password!"});

    }
    return res.status(200).json({message:"Login Successfull",user:existingFaculty});

}