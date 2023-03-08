import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quest:{
        type: String,
        required:true
    },
    
    option1:{
        type: String,
        required: true,
    },
    option2:{
        type:String,
        require : true,
    },
    option3:{
        type:String,
        require : true,
    },
    option4:{
        type:String,
        require : true,
    },
    correct:
    {
        type:Number,
        required:true
    }

});

export default mongoose.model("Question",questionSchema);