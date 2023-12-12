import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema = new Schema({
   username:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    unique:true,
    index:true
   },
   email:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    unique:true,
   },
   fullName:{
    type:String,
    required:true,
    trim:true,
    index:true
   },
   avatar:{
    type:String, //cloudinary url
    required:true
   },
   converImage:{
    type:String, //cloudinary url
   },
   watchHistory:[
    {
      type:Schema.Types.ObjectId,
      ref:"Video"
    }
   ],
   password:{
    type:String,
    required:[true,"Password is must"]
   },
   refreshToken:{
    type:String,
   }
},
{timestamps:true})


//just before savin we can use it
//dont use arrow function because it doesn't possesss context(this keyword)
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()

  this.password = await bcrypt.compare(this.password,10)
  next()
})


userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export const User = mongoose.model("User",userSchema)

