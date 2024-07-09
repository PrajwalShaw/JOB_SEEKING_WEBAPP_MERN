import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js";

export const register = catchAsyncError(async(req,res,next) =>{
    const {name,email,phone,role,password} = req.body;//frontend se jo data mil raha hoga
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill all the necessary details"));
    }

    const isEmail = await User.findOne({email});
    if(isEmail){
       return next(new ErrorHandler("Email already exists"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    });
    // res.status(200).json({
    //     success : true,
    //     message: "User registered",
    //     user
    // });
    sendToken(user,200,res,"User registered successfully");
});


export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role)
    {
       return next(
        new ErrorHandler("Please provide all the neccessary details",400)
       );
    }
    
    const user = await User.findOne({email}).select("+password");//email ke saath saath password bhi get kar raha hu...taki dB  main check kar saku
    //ab user main User ka sara data get ho chuka hain
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
       return next(new ErrorHandler("Password incorrect",400));
    }
    if(user.role !== role){
        return next(new ErrorHandler("User with this role does not exist",400));
    }

    sendToken(user,200,res,"User logged in successfully");
});



export const logout = catchAsyncError(async(req,res,next)=>{//basically login karne ke baad jo cookie milta hain usko delete kar de rahe hain
    res.status(201).cookie("token","",{
        httpOnly : true,
        expires : new Date(Date.now())
    })
    .json({
        success : true,
        message : "User logged out successfully"
    });
});


//get user details so that we can authorize it on the frontend part
export const getUser = catchAsyncError((req,res,next)=>{
     const user = req.user;
     res.status(200).json({
        success:true,
        user
     });
});
