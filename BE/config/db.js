import mongoose from "mongoose"

const conncetDB = async (MONGO_URL) => {
    try {
        const conn = await mongoose.connect(MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default conncetDB
