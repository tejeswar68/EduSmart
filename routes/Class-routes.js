import express from "express";
import {getAllClasses,getClassById,addClass, addStudent} from "../controllers/classController.js";

const classRouter  = express.Router();

classRouter.get("/",getAllClasses);
classRouter.get("/:id",getClassById);
classRouter.post("/addclass/:id",addClass);
classRouter.post("/addstudent/:id",addStudent)

export default classRouter;