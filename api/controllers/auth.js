import User from "../models/User.js"
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken"
import createError from "../utils/createError.js";
//register
export const register=async(req,res,next)=>{
   
    const newUser=new User({
        ...req.body,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    });

   try{
   const savedUser= await newUser.save()

   const accesstoken=Jwt.sign({
    id:User._id,
    isSeller:User.isSeller
},process.env.JWT_SEC,{expiresIn:"3d"})
    res.status(200).json({savedUser,accesstoken})
   
}catch(err){
    next(err)
}
}
//login
export const login=async(req,res,next)=>{
    try{
       const user=await User.findOne(
        {
            username:req.body.username
        }
       )
       if (!user)
           return next(createError(404,"user not found!!"))
            const hashedPassword=CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
    );

       const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)

       const inputPassword=req.body.password;

       if(originalPassword!=inputPassword)

       return next(createError(400,"wrong password!!"))
       const accessToken=Jwt.sign(
           {
           id:user._id,
           isSeller:user.isSeller,
            },
            process.env.JWT_SEC, {expiresIn:"3d"}
            );
       const{password,...others}=user._doc;
      res.
       cookie("accesstoken",accessToken,{
        htppOnly:true
         })
       .status(200)
       .json({details:{...others,accessToken}})
       

    }catch(err){
        next(err)
    }
}
//logout
export const logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };

