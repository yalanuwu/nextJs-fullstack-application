import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB")
        })

        connection.on("Error", (err) => {
            console.log(`MongoDB connection Error ${err}`)
            process.exit()
        })
    } catch (error) {
        console.log('Error Connecting to DB: ' + error)
    }
}