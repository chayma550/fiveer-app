import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true,unique:true},
    img:{type:String},
    country:{type:String,required:true},
    phone:{type:Number},
    desc:{type:String},
    isSeller:{type:Boolean,default:false}

},{timestamps:true})
export default mongoose.model("User",userSchema)