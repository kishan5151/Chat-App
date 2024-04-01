const mongoose= require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            index:true
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type:String,
            required:true
        },
        pic:{
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        }
    },{timestamps: true}
)

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save",async function(next){
    //decript the password using pre middelwares
    if(!this.isModified("password")){
        next();
    }

    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userSchema);

module.exports = User;