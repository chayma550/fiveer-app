import User from "../models/User.js"
import createError from "../utils/createError.js";

//update user
export const updateUser=async(req,res,next)=>{
    try{
        const updateUser=await User.findById(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
}

//delete user
export const deleteUser=async(req,res,next)=>{
    try{
        const deleteUser=await User.findByIdAndDelete(req.params.id)
        return next(createError(403,"account deleted!!"))

    }catch(err){
        res.status(500).json(err)
    }
}

//get user
export const getUser=async(req,res,next)=>{
     const user=await User.findById(req.params.id)
     res.status(200).send(user)
    
}



