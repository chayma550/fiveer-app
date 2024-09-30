import Gig from "../models/Gig.js";
import Review from "../models/Review.js"
import createError from "../utils/createError.js"

export const createReview=async(req,res,next)=>{
  if(req.isSeller) return next(createError(401,"Sellers cannot create a review!!"))
  const newReview=new Review({
    userId:req.body.userId,
    gigId:req.body.gigId,
   desc:req.body.desc,
   star:req.body.star});
   try{
    const review=await Review.findOne({gigId:req.body.gigId,userId:req.body.userId})    
    if(review) return next(createError(403,'you have already create a review'))
    const savedReview=await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1},
    });
res.status(201).send(savedReview)
   }catch(err){
    next(err);
   }
};


export const getReview=async(req,res,next)=>{
    try{
      const reviews=await Review.find({gigId:req.params.gigId})
      res.status(201).send(reviews)
    }catch(err){
        next(err)
    }
}

export const deleteReview=async(req,res,next)=>{
    
}