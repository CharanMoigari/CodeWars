import { Request, Response } from "express";
import Problems from "../models/Problems";
export const createProblem = async (req: Request, res: Response) => {
  let {
    title,
    description,
    difficulty,
    tags,
    inputFormat,
    outputFormat,
    sampleTestCases,
    hiddenTestCases,
  } = req.body.formData;
  console.log( title,
    description,
    difficulty,
    tags,
    inputFormat,
    outputFormat,
    sampleTestCases,
    hiddenTestCases)
  const newProblem = await Problems.create({
    title:title,
    description:description,
    difficulty:difficulty,
    tags:tags,
    inputFormat:inputFormat,
    outputFormat:outputFormat,
    sampleTestCases:sampleTestCases,
    hiddenTestCases:hiddenTestCases,
  });
  console.log(newProblem)
  return res.status(200).json({ msg: "Successfully added", Data: newProblem });
};

export const getProblem=async (req:Request,res:Response)=>{
    try{
       const id=req.query.id
       const problem= await Problems.findById(id)
       console.log(problem)
       return res.status(200).json({ msg: "Successfully added", Data:problem});
    }
    catch(error){
console.log("error in getProblem",error)
    }

}