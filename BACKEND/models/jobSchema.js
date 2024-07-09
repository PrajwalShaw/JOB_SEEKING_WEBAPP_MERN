import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Please provide all the necessary details"],
        minLength: [3, "Job title should contain atleast three characters"],
        maxLength: [50,"Job title should not exceed 50 words"]
    },
    description:{
        type: String,
        required: [true,"Please provide a job description"],
        minLength: [50,"Job description must contain atleast 50 characters"],
        maxLength: [250,"Job description must not exceed 250 characters"]
    },
    category:{
        type: String,
        required: [true,"Job category is required"]
    },
    country:{
        type: String,
        required: [true,"Job country is required"]
    },
    city:{
        type: String,
        required: [true,"Job city is required"]
    },
    location:{
        type: String,
        required: [true,"Please provide exact location of job"],
        maxLength: [50,"Job location cannot exceed 50 characters"]
    },
    fixedSalary:{
        type: Number,
        minLength: [4,"Fixed salary should be atleast 4 digits"],
        maxLength: [7,"Fixed salary cannot exceed 7 digits"]
    },
    salaryFrom:{
        type: Number,
        minLength: [4,"salary from must contain  atleast 4 digits"],
        maxLength: [7,"salary from must not exceed 7 digits"],
    },
    salaryTo:{
        type: Number,
        minLength: [4,"salary to must contain  atleast 4 digits"],
        maxLength: [7,"salary to must not exceed 7 digits"],
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",//reference to user from User schema
        required: true
    }
});

export const Job = mongoose.model("Job",jobSchema);