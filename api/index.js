import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRoute from "./routers/users.js"
import authRoute from "./routers/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import gigRoute from "./routers/gig.js"
import reviewRoute from "./routers/review.js"
import orderRoute from "./routers/order.js"
import conversationRoute from "./routers/conversation.js"
import messageRoute from "./routers/message.js"
const app=express();
dotenv.config();
mongoose.set("strictQuery", true);

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>
console.log("DB connecting ")).catch((err)=>{
  console.log(err)  
})
//middlewares
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(cookieParser())

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute);
app.use("/api/gigs",gigRoute);
app.use("/api/reviews",reviewRoute)
app.use("/api/orders",orderRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)





app.use((err,req,res,next)=>{
  const errorStatus=err.status||500;
  const errorMessage=err.message||"something was wrong!"
  return res.status(errorStatus).send(errorMessage)
})

//express 
app.listen(process.env.PORT||8800,()=>{
    console.log("server run on port 8800")
})  