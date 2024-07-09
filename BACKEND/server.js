import app from "./app.js";//package.json main type main module daal diya hain na isliye ab kuch bhi import karunga toh last main .js lagana padega
import cloudinary from "cloudinary";


cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLIENT_NAME,
    api_key : process.env.CLOUDINARY_CLIENT_API,
    api_secret : process.env.CLOUDINARY_CLIENT_SECRET 
});

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
});