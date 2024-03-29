import express  from "express";
import mongoose from "mongoose";
import studentrouter from "./routes/Student-routes.js";
import facultyRouter from "./routes/Faculty-routes.js";
import classRouter from "./routes/Class-routes.js";
import testRouter from "./routes/Test-routes.js";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import questRouter from "./routes/Quest-routes.js";



dotenv.config();
const App = express();
mongoose.connect(process.env.CONNECTION_URL)
 .then(()=>console.log("Connected to database"))
 .catch((err) => console.log(err))

App.use(cors());
App.use(express.json());
App.use("/api/student",studentrouter);
App.use("/api/faculty",facultyRouter);
App.use("/api/class",classRouter);
App.use("/api/test",testRouter);
App.use("/api/quest",questRouter);
// ------------deployment------------

const __dirname = path.resolve();
//Serve Static assets if in production
if(process.env.NODE_ENV === 'production')
{
    App.use(express.static('client/build'));

    App.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

//
// ------------deployment--------------

const PORT = process.env.PORT||5000;
 App.listen(PORT,()=>console.log(`server listening on port ${PORT}`));
   
  