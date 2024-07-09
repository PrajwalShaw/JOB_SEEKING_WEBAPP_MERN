export const catchAsyncError = (theFunction) => {
    return(req,res,next) =>{
        Promise.resolve(theFunction(req,res,next)).catch(next);//catch will only be executed if promise does not get resolved
    };
};