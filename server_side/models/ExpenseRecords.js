import mongoose from "mongoose";

const ExpesneRecordsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
})

const ExpenseRecord = mongoose.model("ExpenseRecord", ExpesneRecordsSchema)
export default ExpenseRecord