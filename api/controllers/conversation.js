import Conversation from "../models/Conversation.js"
import createError from "../utils/createError.js";


export const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller:true,
      readByBuyer: true,
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(201).send(savedConversation);
    } catch (err) {
      next(err);
    }
  };

export const getConversations=async(req,res,next)=>{
    try{
       const conversations=await Conversation.find(req.isSeller ? {sellerId:req.userId}:{buyerId:req.userId}
        ).sort({ updatedAt: -1 });
      
       res.status(200).send(conversations)
       
    }catch(err){
        next(err)
    }
}

export const getSingleConversation=async(req,res,next)=>{
    try{
        const conversation=await Conversation.findOne({id:req.params.id})
        if(!conversation)return next(createError(404,"this conversation does not exist"))
        res.status(200).send(conversation)
    }catch(err){
        next(err)
    }
}

export const updateConversation=async(req,res,next)=>{
    try{
         const updatedConversation=await Conversation.findOneAndUpdate({id:req.params.id},{
           $set:{
            readBySeller:req.isSeller,
            readByBuyer:!req.isSeller
           }
         },{new:true})
         res.status(200).send(updatedConversation)
    }catch(err){
        next(err)
    }
}