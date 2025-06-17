import React from "react";
import { Button } from "@mui/material";

const TransactionCard = ({ transactionRecord, handleDelete }) => {
console.log (transactionRecord , "mere records")

  return (
    // <>
    //   {transactionRecords.map((record) => (
    //     <div key={record._id} className="transaction-card">
    //       <div className="transaction-left">
    //         <img
    //           src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-business-finance-logo-arrow-up-account-vector-picture-image_9798642.png"
    //           alt=""
    //           className="transaction-icon"
    //         />
    //         <div>
    //           <div className="transaction-category">{record.title}</div>
    //           <div className="transaction-amount">
    //             PKR {Number(record.amount).toLocaleString()}
    //           </div>
    //           <div className="transaction-avg">{record.date}</div>
    //         </div>
    //       </div>
    //       <div className="transaction-right">
    //         <div
    //           className="transaction-change"
    //           style={{
    //             display: "flex",
    //             width: "180px",
    //             justifyContent: "flex-end",
    //           }}
    //         >
    //           {record.category}
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             gap: "10px",
    //             width: "180px",
    //             justifyContent: "flex-end",
    //             marginTop: "10px",
    //           }}
    //         >
    //           <Button
    //             sx={{ fontSize: "12px", padding: "5px 14px" }}
    //             variant="outlined"
    //             // onClick={() => handleDelete(record._id)}
    //           >
    //             delete
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </>
    <></>
  );
};

export default TransactionCard;
