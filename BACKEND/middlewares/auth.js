import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import {User} from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    //console.log("token",token);
    if(!token){
        return next(new ErrorHandler("User not authorized",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);//humare paas jo token hain kya woh usi secret key ka use 
    //karke bana hain ya phir woh banda kisi aur website ka token use kar raha hain...yehi sab verify karta hain
    //decoded ke andar humare user ki id store hui hain
     
    req.user = await User.findById(decoded.id);

    next();
});