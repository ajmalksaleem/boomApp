import { Schema,model } from "mongoose";

const commentSchema = new Schema({
  videoId: { 
    type: Schema.Types.ObjectId, 
    ref: 'video', 
    required: true },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'user', 
    required: true },
  commentText:{ 
    type: String, 
    required: true 
},
}, { timestamps: true });

const Comment = model('comment', commentSchema)

export default Comment;