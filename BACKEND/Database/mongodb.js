import mongoose from "mongoose";
const Mongoose = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Database Connected Successfully".bgGreen);
  } catch (error) {
    console.log("Database Connection Failed".bgRed);
    process.exit(1);
  }
};
export default Mongoose;
