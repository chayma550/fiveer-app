import Order from "../models/Order.js"
import Gig from "../models/Gig.js"
import Stripe from "stripe"
export const  createOrder=async(req,res,next)=>{
  try{
    const gig=await Gig.findById(req.params.gigId)
   
    res.status(201).send("successful!!")
  }catch(err){
    next(err)
  }
}


export const getOrder=async(req,res,next)=>{
    try{
       const orders=await Order.find({...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),
    isCompleted:true,})
    res.status(201).send(orders)
    }catch(err){
        next(err)
    }
}
export const intent=async(req,res,next)=>{
  const stripe=new Stripe( process.env.STRIPE);
  const gig=await Gig.findById(req.params.id)
const paymentIntent = await stripe.paymentIntents.create({
  amount: gig.price * 100,
  currency: "usd",
  automatic_payment_methods: {
    enabled: true,
  },
});
const newOrder= new Order({
  gigId:gig._id,
  img:gig.cover,
  title:gig.title,
  buyerId:req.userId,
  sellerId:gig.userId,
  price:gig.price,
  payment_intent:paymentIntent.id,
})
await newOrder.save()
res.status(200).send({
clientSecret:paymentIntent.client_secret,
})
} 
