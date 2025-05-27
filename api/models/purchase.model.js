import { Schema,model } from "mongoose";

const purchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = model("purchase", purchaseSchema);
export default Purchase
