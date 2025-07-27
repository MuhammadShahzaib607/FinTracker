import ClientRecords from "../models/ClientRecords.js"

export const clientPaymentRecords = async (req, res)=> {
try {
const {clientName, amount, status, date} = req.body 

if (clientName === "" || amount === "" || status === "" || date === "") {
    return res.status(400).json({
        "status": false,
        "message": "missing fields"
    })
}

const newClientRecord = new ClientRecords({
    clientName,
    amount,
    status,
    postedBy: req.user._id,
    date,
})

const savedRecord = await newClientRecord.save()

    res.status(200).json({
        "status": true,
        "message": "client data stored successfully",
"data": savedRecord,
    })

} catch (error) {
    res.status(400).json({
        "status": false,
        "message": "something went wrong",
"error": error.message,
    })
}
}

export const getClientPaymentRecords = async (req, res)=> {
    try {
const paymentRecords = await ClientRecords.find()

const filteredPaymentRecords = paymentRecords.filter((record)=> {
    return record.postedBy === req.user._id
})

if (!filteredPaymentRecords) {
res.status(400).json({
    "status": false,
    "message": "No Data found!"
})
}

res.status(200).json({
    "status": true,
    "message": "client Payment records get Successfully",
    "data": filteredPaymentRecords
})

    } catch (error) {
   res.status(400).json({
    "status": false,
    "message": "something went wrong",
    "error": error.message
})     
    }
}

export const updateClientPaymentRecord = async (req, res)=> {
    try {
        const {clientName, amount, status} = req.body
      const updatedRecord = await ClientRecords.findByIdAndUpdate(req.params.id,
         {clientName, amount, status},
         {new: true}
        )
      res.status(200).json({
        "status": true,
        "message": "user Payment record update Successfully",
        "data": updatedRecord
      })
    } catch (error) {
        res.status(400).json({
        "status": false,
        "message": "something wen wrong",
        "error": error.message
      })
    }
}

export const clientPaymentRecordsFilteredByStatus = async (req, res)=> {
    try {
        const clientRecords = await ClientRecords.find()
        const filteredByUserId = clientRecords.filter((record)=> {
return record.postedBy === req.params.id
         })

         if(filteredByUserId.length === 0) {
return res.status(400).json({
            "status": false,
            "message": "No Such data found"
        })
         } else {
             var filteredByStatus = filteredByUserId.filter((record)=> {
                return record.status === req.params.status
             })
         }

        res.status(200).json({
            "status": true,
            "message": "data get successfully by Status",
            "data": filteredByStatus
        })
    } catch (error) {

 res.status(400).json({
            "status": false,
            "message": "something went wrong",
            "error": error.message
        })
    }
}

export const deleteClientPaymentRecord = async (req, res)=> {
    try {
        const deletedRecord = await ClientRecords.findByIdAndDelete(req.params.id)
        res.status(200).json({
        "status": true,
        "message": "client Payment Record Delete Successfully",
        "deletedRecord": deletedRecord
      })
    } catch (error) {
        res.status(400).json({
        "status": false,
        "message": "something went wrong",
        "error": error.message
      })
    }
}
