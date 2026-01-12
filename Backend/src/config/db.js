import { connect } from "mongoose"

const connectDB = async () => {
  await connect(process.env.MONGO_URI)
  console.log("MongoDB connected")
}

export default connectDB
