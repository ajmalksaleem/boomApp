import { Schema, model } from "mongoose";

const giftSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    toCreatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    amount: { 
        type: Number, 
        required: true
     },
  },
  { timestamps: true }
);

const Gift = model("gift", giftSchema);
export default Gift