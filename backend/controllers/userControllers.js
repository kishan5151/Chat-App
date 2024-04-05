const asyncHandler =require("express-async-handler");
const User=require("../models/user.models");
const generateToken=require("../Config/generateToken");
const {ApiError}=require("../util/ApiError.js");
const uploadCloudinary=require("../util/cloudinary");
const {ApiResponse}=require("../util/ApiResponse.js");

const registerUser=  asyncHandler(async(req,res)=>{

    //1. get user detail from frontend
    const { userName, email, password, mobile} =req.body;

    //2. validation-not empty
    if([userName, email, password, mobile].some((field)=>field.trim() === "")){
        throw new ApiError(400,"All Fields Are Require")
    }

    //3. check if user already exists
    const exists= await User.findOne({email});
    if(exists){
        throw new ApiError(409,"User email Already exists");
    }

    //4. check for images : - check for pic
    let picUrl="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

    const picPath=req.file?.path || null;

    //5. upload on cloudinary : get url from cloudinary
    if(picPath){
        const picObj=await uploadCloudinary(picPath);
        picUrl=picObj.url;
    }
    console.log(picUrl);
    //6.craete user object -craete entry on db
    const user=await User.create({
        userName,
        email,
        password,
        mobile,
        pic : picUrl
    })

    //7. response time create response object by removing token and password
    //8. return response
    if(user){
        const resUser={
            _id: user._id,
            userName: user.userName,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        }
        return res.status(201).json(
            new ApiResponse(200,resUser,"Register Successfully")
        )

    }
});

const authUser=asyncHandler(async(req,res)=>{
    const {email, password} =req.body;
    // console.log(email,password);

    const user=await User.findOne({email});

    // console.log(user);

    if(user && (await user.comparePassword(password))){
        res.json({
            _id:user._id,
            userName: user.userName,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new ApiError(401,"Invalid Email Or Password");
    }
})

//url = /api/users?search=kishan
const allUser=asyncHandler(async(req,res)=>{
    const keyword= req.query.search ? {
        $or: [
            {userName: {$regex : req.query.search, $options : "i"}},
            {email: {$regex : req.query.search, $options : "i"}},
        ]
    }:{};
    console.log(keyword);

    const users= await User.find(keyword).find({_id: {$ne : req.user._id}});  //find use authantication because id is not now
    res.send(users);
});

module.exports={registerUser, authUser, allUser};