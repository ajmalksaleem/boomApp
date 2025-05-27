import { connect } from "mongoose";

const connectToDb = async () => {
  try {
    const conn = await connect(process.env.MONGO_URL);
    console.log("connected to mongodb", conn.connection.host);
  } catch (error) {
    console.log("failed to connect database", error);
    process.exit(1);
  }
};
export default connectToDb;