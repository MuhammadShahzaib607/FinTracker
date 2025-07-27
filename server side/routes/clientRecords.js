import express from "express"
import { clientPaymentRecords, clientPaymentRecordsFilteredByStatus, deleteClientPaymentRecord, getClientPaymentRecords, updateClientPaymentRecord } from "../controllers/clientRecords.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/",verifyToken ,clientPaymentRecords)
router.get("/",verifyToken ,getClientPaymentRecords)
router.put("/:id", updateClientPaymentRecord)
router.delete("/:id", deleteClientPaymentRecord)
router.get("/filteredByCategory/:id/:status", verifyToken, clientPaymentRecordsFilteredByStatus)

export default router