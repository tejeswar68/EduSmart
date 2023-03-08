import express from "express";
import {getQuestionById} from "../controllers/questController.js";

const questRouter  = express.Router();

questRouter.get("/:id",getQuestionById);

export default questRouter;