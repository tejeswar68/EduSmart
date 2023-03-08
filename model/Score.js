import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  scored :
  {
    type:Number,

  },
  total :
  {
    type:Number,
  },
  studentid : 
  {
    type : mongoose.Types.ObjectId,
    ref : "Student"
  },
    
});

export default mongoose.model("Score",scoreSchema);