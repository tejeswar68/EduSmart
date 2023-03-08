import express from "express";
import { getAllTests ,getTestById ,addTest, addQuestion} from "../controllers/testController.js";

const testRouter  = express.Router();

testRouter.get("/",getAllTests);
testRouter.get("/:id",getTestById);
testRouter.post("/addtest",addTest);
testRouter.post("/addquestion",addQuestion);

export default testRouter;