import Question from "../model/Question";

export const getQuestionById = async(req,res,next)=>
{
    const id = req.params.id;

    let question;

    try {
        question = await Question.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!question)
    {
        return res.status(404),json({message:"NO QUESTION FOUND!"});
    }
    return res.status(200).json({question:question});
}
