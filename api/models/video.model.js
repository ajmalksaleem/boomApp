import { Schema,model } from "mongoose";

const videoSchema = new Schema({
    creatorId :{
        type : Schema.Types.ObjectId, ref : "user",
        required : true
    },
    title :{
        type : String,
        required : true
    },
    description :{
        type : String,
    },
    type :{
        type : String,
        enum: ['short', 'long'],
        required : true
    },
    videoUrl :{
        type : String,
        required : true
    },
    isPaid :{
        type : Boolean,
        default: false
    },
    price :{
        type : Number,
        default: 0
    },


},
{timestamps:true}
)

const Video = model('video', videoSchema)

export default Video;