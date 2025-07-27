import mongoose from "mongoose";

const clientRecordsSchema = new mongoose.Schema({
clientName: {
    type: String,
    required: true
},
amount: {
    type: Number,
    required: true
},
status: {
    type: String,
    required: true
},
postedBy: {
    type: String,
    required: true
},
date: {
    type: String,
    required: true
}
})

const ClientRecords = mongoose.model("ClientRecords", clientRecordsSchema)

export default ClientRecords