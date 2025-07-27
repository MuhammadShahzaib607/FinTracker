import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import expenseRecords from "./routes/expenseRecords.js"
import clientRecords from "./routes/clientRecords.js"
import cors from "cors"

dotenv.config()

const app =  express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/expenseRecords", expenseRecords)
app.use("/clientRecords", clientRecords)

const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URL)
}

connectDB()

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
