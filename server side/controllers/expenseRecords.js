import ExpenseRecord from "../models/ExpenseRecords.js"

export const expenseRecordPost = async (req, res)=> {
    try {
        console.log("user ID ===>>>> ", req.user._id)
     const {title, amount, category} = req.body
     if (title === "" || amount === "" || category === "") {
return  res.status(400).json({
        "status": false,
        "message": "missing feilds"
    })
     }

const newRecord = new ExpenseRecord({
    title,
    amount,
    category,
    date: new Date().toDateString(),
    userId: req.user._id,
    userEmail: req.user.email
})

const savedRecord = await newRecord.save()

    res.status(200).json({
        "status": true,
        "message": "data post successfully",
        "data": savedRecord
    })
  } catch (error) {
       res.status(400).json({
        "status": false,
        "message": "something went wrong",
        "error": error.message
    })
  }
}

export const getSingleUserRecord = async (req, res)=> {
    try {
        const data = await ExpenseRecord.find()

const fileterdData = data.filter((record)=> {
    return record.userId === req.user._id
})

        res.status(200).json({
            "status": true,
            "message": "data get successfully",
            "data": fileterdData
        })
    } catch (error) {
        res.status(400).json({
            "status": false,
            "message": "something went wrong",
            "error": error.message
        })
    }
}

export const deleteSingleRecord = async (req, res)=> {
try {

const deleteRecord = await ExpenseRecord.findByIdAndDelete(req.params.id)

      res.status(200).json({
            "status": true,
            "message": "record delete successfully"
        })
} catch (error) {
      res.status(400).json({
            "status": false,
            "message": "something went wrong",
            "error": error.message
        })
}
}

export const getRecordsByCategory = async (req, res)=> {
    try {
if (!req.query.id || !req.query.category) {
return res.status(400).json({
    "status": false,
    "message": "no category or Id found"
})
}
        const data = await ExpenseRecord.find()

const filteredData = data.filter((record)=> {
    return record.userId === req.query.id && record.category === req.query.category
})

res.status(200).json({
    "status": true,
    "message": "data filtered by category successfully",
    "id": req.query.id,
    "data": filteredData
})

    } catch (error) {
  res.status(400).json({
    "status": false,
    "message": "something went wrong",
    "error": error.message
})      
    }
}

export const getRecordsByDate = async (req, res)=> {
    res.send("filtered by date")
}