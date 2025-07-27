import React, { useEffect, useRef, useState } from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack, TextField, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import axios from "axios";
import { toastAlert } from "../utils";
import TransactionCard from "../components/TransactionCard";

const options = ["expense", "income"];

const RecordEntry = () => {


 const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
    const [refreshRecords, setRefreshRecords] = useState(false)
  const [transactionRecord, setTransactionRecord] = useState([])


    const handleClick = () => {
        setCategory(options[selectedIndex])
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        setCategory(options[index])
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

    const addTransactionHandler = async ()=> {

        if (title === "" || amount === "" || category === "") {
        return toastAlert({
            type: "error",
            message: "Missing Field"
        })
    }

        try {
            const response = await axios.post("https://fin-tracker-five-virid.vercel.app/expenseRecords/", {
                title,
                amount,
                category,
            },{
                headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
            })
            //   setTransactionRecord(response.data.data)
              setAmount("")
              setTitle("")
              setCategory("")
              setRefreshRecords(prev => !prev);
              toastAlert({
            type: "success",
            message: "Record add Successfully"
        })
              document.getElementById('my_modal_3').close();
        } catch (error) {
            toastAlert({
                type: "error",
                      message: error.response.data.message
            })    
        }
    }

    const getTransactionRecords = async ()=> {
try {
    const response = await axios.get("https://fin-tracker-five-virid.vercel.app/expenseRecords/", {
          headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
    })

   setTransactionRecord(response.data.data.reverse())
} catch (error) {
                toastAlert({
                type: "error",
                      message: error.response.data.message
            })    
}
    }

    const deleteHandler = async (id)=> {
try {
        const response = await axios.delete(`https://fin-tracker-five-virid.vercel.app/expenseRecords/${id}`, {
          headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
    })
    toastAlert({
                type: "success",
                      message: "Record deleted successfully"
            })
    setRefreshRecords(prev => !prev);
} catch (error) {
    toastAlert({
                type: "error",
                      message: error.response.data.message
            })    
}
}


    useEffect(()=> {
        getTransactionRecords()
    }, [refreshRecords])


    return (
        <>
            {/* navbar */}
            <header>
                <div className="container">
                    <div className="logo">
                        <img src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-business-finance-logo-arrow-up-account-vector-picture-image_9798642.png" alt="FairRate Logo" />
                        <span>FinTracker</span>
                    </div>
                    <div className="contact-info">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+92 340 3004439</span>
                    </div>
                    <nav>
                        <ul style={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <li><Link to="/home">HOME</Link></li>
                            <li><Link to="/client">CLIENT</Link></li>
                            <button className="btn" style={{ marginLeft: "15px" }}
                                onClick={() => document.getElementById('my_modal_3').showModal()}>
                                + Add Transaction
                            </button>
                        </ul>
                    </nav>
                </div>
            </header>


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <Stack>

                        <Typography sx={{ marginTop: "25px" }}>Transaction Title</Typography>
                        <TextField sx={{ width: "100%", marginTop: "10px" }} value={title} onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Transaction Title" variant="outlined" />
                        <Typography sx={{ marginTop: "25px" }}>Transaction Amount</Typography>
                        <TextField sx={{ width: "100%", marginTop: "10px" }} type='number' value={amount} id="outlined-basic" label="Transaction Amount" onChange={(e) => setAmount(e.target.value)} variant="outlined" />


                        <ButtonGroup
                            variant="contained"
                            ref={anchorRef}
                            aria-label="Button group with a nested menu"
                            sx={{ marginTop: "20px", boxShadow: "0" }}
                        >
                            <Button onClick={handleClick}>
                                {selectedIndex === -1 ? 'Status' : options[selectedIndex]}
                            </Button>
                            <Button
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select status"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>

                        <Popper
                            sx={{ zIndex: 1 }}
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom' ? 'center top' : 'center bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList id="split-button-menu" autoFocusItem>
                                                {options.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        selected={index === selectedIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>

                        <Button variant="contained" sx={{
                            width: "100%",
                            alignSelf: "center",
                            mt: "30px",
                            borderRadius: "10px",
                            height: "50px"
                        }} onClick={addTransactionHandler}>add Record</Button>
                    </Stack>

                </div>
            </dialog>

<div style={{
  marginTop: "20px"
}}>
<TransactionCard 
transactionRecord={transactionRecord}
handleDelete={deleteHandler}
/>
</div>

        </>
    )

}

export default RecordEntry