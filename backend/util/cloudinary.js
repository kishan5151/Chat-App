const cloudinary= require('cloudinary');
const fs=require("fs");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }
        const response= await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto"
        })
        //file has been upload successfull
        // console.log("file is uploaded on cloudinary ",response.url);
        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        return null;
    }
}

module.exports=uploadCloudinary;
