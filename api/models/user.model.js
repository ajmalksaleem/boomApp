import { Schema,model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required : true,
        min : 3,
        max:20,
        unique :true
    },
    email:{
        type:String,
        required : true,
        unique :true
    },
    password:{
        type:String,
        required : true,
    },
    walletBalance:{
        type : Number,
        default: 500
    },
    
},
{timestamps:true}
)

const User = model('user', userSchema)

export default User;