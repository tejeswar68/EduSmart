
import mongoose from "mongoose";
// import Question from "./Question.js";
const Schema = mongoose.Schema;

const testSchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    classroom:
    {
        type: mongoose.Types.ObjectId,
        ref: "Class"
    },
    questions: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
    students: [{ type: mongoose.Types.ObjectId, ref: "Score" }],
    faculty: { type: mongoose.Types.ObjectId, ref: "Faculty" },

});


export default mongoose.model("Test", testSchema);