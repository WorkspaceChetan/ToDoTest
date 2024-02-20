import mongoose from "mongoose";

const connectionDatabase = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    conn.connection.on("connected", () => {
      console.log(`Connected To mongodb Database ${conn.connection.host}`);
    });
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};
export default connectionDatabase;
