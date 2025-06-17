import React, { useState, useRef } from "react";
import { Button, ButtonGroup, TextField, Typography, Stack, MenuItem, MenuList, Popper, Grow, Paper, ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import { toastAlert } from "../utils";

const Card = ({ paymentRecords, handleUpdate, handleDelete, filteredClientName, filteredAmount, setRefreshRecords }) => {
    const [clientName, setClientName] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [currentId, setCurrentId] = useState("")
    const [updatedClientName, setUpdatedClientName] = useState("")
    const [updatedAmount, setUpdatedAmount] = useState("")
    const [updatedStatus, setUpdatedStatus] = useState("")
    const options = ["Paid", "Pending"];

    const handleClick = () => {
        setUpdatedStatus(options[selectedIndex])
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setUpdatedStatus(options[index]);
    setOpen(false);
};

    const updateClientRecord = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.put(`http://localhost:8000/clientRecords/${currentId}`, {
                clientName: updatedClientName,
                amount: updatedAmount,
                status: updatedStatus,
            })
            toastAlert({
                type: "success",
                message: "record Updated successfully"
            })
            setRefreshRecords(prev => !prev);
            document.getElementById('my_modal_4').close();
        } catch (error) {
                        toastAlert({
                type: "error",
                message: response.data.message
            })
        }
    };

    return (
        <>
            {paymentRecords.map((record) => (
                <div key={record._id} className="transaction-card">
                    <div className="transaction-left">
                        <img src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-business-finance-logo-arrow-up-account-vector-picture-image_9798642.png" alt="" className="transaction-icon" />
                        <div>
                            <div className="transaction-category">{record.clientName}</div>
                            <div className="transaction-amount">PKR {Number(record.amount).toLocaleString()}</div>
                            <div className="transaction-avg">{record.date}</div>
                        </div>
                    </div>
                    <div className="transaction-right">
                        <div className="transaction-change" style={{
                            color: record.status.toLowerCase() === "paid" ? "#008000cf" : "red",
                            display: "flex",
                            width: "180px",
                            justifyContent: "flex-end"
                        }}>
                            {record.status}
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            width: "180px",
                            justifyContent: "flex-end",
                            marginTop: "10px",
                        }}>
                            <Button sx={{ fontSize: "12px", padding: "5px 14px" }} variant="contained" onClick={() => {
                                handleUpdate(record._id)
                                setCurrentId(record._id)
                                setUpdatedClientName(record.clientName);
                                setUpdatedAmount(record.amount);
                                setUpdatedStatus(record.status);
                                const statusIndex = options.findIndex(opt => opt.toLowerCase() === record.status.toLowerCase())
    setSelectedIndex(statusIndex)
                            }}>update</Button>
                            <Button sx={{ fontSize: "12px", padding: "5px 14px" }} variant="outlined" onClick={() => handleDelete(record._id)}>delete</Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <Stack>
                        <Typography sx={{ marginTop: "25px" }}>Client Name</Typography>
                        <TextField sx={{ width: "100%", marginTop: "10px" }} value={updatedClientName} onChange={(e) => setUpdatedClientName(e.target.value)} label="Client Name" variant="outlined" />
                        <Typography sx={{ marginTop: "25px" }}>Amount</Typography>
                        <TextField sx={{ width: "100%", marginTop: "10px" }} type='number' value={updatedAmount} onChange={(e) => setUpdatedAmount(e.target.value)} label="Amount" variant="outlined" />

                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="Button group with a nested menu" sx={{ marginTop: "20px", boxShadow: "0" }}>
                            <Button onClick={handleClick}>
                                {selectedIndex === -1 ? 'Status' : options[selectedIndex]}
                            </Button>
                            <Button size="small" aria-haspopup="menu" onClick={handleToggle}>
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>

                        <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem>
                                                {options.map((option, index) => (
                                                    <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>

                        <Button variant="contained" sx={{ width: "100%", mt: "30px", borderRadius: "10px", height: "50px" }} onClick={updateClientRecord}>update Record</Button>
                    </Stack>
                </div>
            </dialog>
        </>
    );
};

export default Card;
