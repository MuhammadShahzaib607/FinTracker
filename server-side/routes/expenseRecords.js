import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import ExpenseRecord from "../models/ExpenseRecords.js"
import { deleteSingleRecord, expenseRecordPost, getRecordsByCategory, getRecordsByDate, getSingleUserRecord } from "../controllers/expenseRecords.js"

const router = express.Router()

// router.get("/", verifyToken, (req, res)=> {
//     res.json({
//         "status": true,
//         "message": "data get successfully"
//     })
// })

router.post("/", verifyToken, expenseRecordPost)
router.get("/filterByCategory/", verifyToken, getRecordsByCategory)
router.get("/filterByDate/", verifyToken, getRecordsByDate)
router.get("/",verifyToken, getSingleUserRecord)
router.delete("/:id", deleteSingleRecord)


export default router