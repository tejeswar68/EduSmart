import express from "express";
import {getAllStudents ,getStudentById ,Signup ,login} from "../controllers/studentController.js";

const studentrouter = express.Router();

studentrouter.get("/",getAllStudents);
studentrouter.get("/:id",getStudentById);
studentrouter.post("/signup",Signup);
studentrouter.post("/login",login);

export default studentrouter;