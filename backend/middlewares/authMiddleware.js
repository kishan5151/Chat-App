const jwt=require("jsonwebtoken");
const User=require("../models/user.models");
const asyncHandler=require("express-async-handler");
const { ApiError } = require("../util/ApiError");

const protect =asyncHandler(async (req,res,next)=>{
     let token;

     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];

            //decode token id
            const decoded =jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(error){
            res.status(401);
            throw new ApiError("401","Not authorized, token failed");
        }
     }

     if(!token){
        // res.status(401);
        throw new ApiError(401,"Not authorized, No token")
     }
})

module.exports=protect;