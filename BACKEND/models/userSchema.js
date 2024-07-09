import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true,"Please enter your name"],
        minLenght : [3,"Name must contain 3 characters"],
        maxLength : [30,"Name cannot exceed 30 characters"]
    },
    email:{
        type : String,
        required: [true,"Please provide a your email"],
        validate : [validator.isEmail,"Please provide a valid email"]
    },
    phone:{
        type : Number,
        required : [true,"Please provide your phone number"]
    },
    password:{
        type : String,
        required : [true,"Please provide your password"],
        minLenght : [8,"Name must contain 8 characters"],
        maxLength : [10,"Name cannot exceed 10 characters"],
        select : false//don't know why it's here
    },
    role:{
        type : String,
        required : [true,"Please provide your role"],
        enum : ["Job Seeker","Employer"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});


//Hashing the password
//yeh koi method nahi hain jisko call karenge. Jab bhi user schema main koi input dega user yeh automatically run karegi
userSchema.pre("save" , async function(next){//save karne se pehle...
    if(!this.isModified("password")){
        next();//execute the next set of code
    }
    this.password = await bcrypt.hash(this.password,10);//passowrd kitna strong hain iska check laga rahe hain
});

//Comparing the password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

//Generating JWT token for auhorization
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{//_id:jab user create hota hain mongodb main tab usko ek id milti hain
        expiresIn : process.env.JWT_EXPIRE,
    });
};


export const User = mongoose.model("User",userSchema);//userSchema ka model create kiya humne
