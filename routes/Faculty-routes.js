import express from "express";
import {getAllFaculties,getFacultyById,Signup,login} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.get("/",getAllFaculties);
facultyRouter.get("/:id",getFacultyById);
facultyRouter.post("/signup",Signup);
facultyRouter.post("/login",login);

export default facultyRouter;