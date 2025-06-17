import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { toastAlert } from '../utils'
import axios from 'axios'
import { useEffect } from 'react'
import Card from '../components/Card.jsx'

const options = ["Paid", "Pending"];

const Client = ()=> {

 const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [clientName, setClientName] = useState("")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState("")
  const [refreshRecords, setRefreshRecords] = useState(false)
  const [paymentRecords, setPaymentRecords] = useState([])
  const [filteredClientName, setFilteredClientName] = useState("")
  const [filteredAmount, setFilteredAmount] = useState("")


  const handleClick = () => {
    setStatus(options[selectedIndex])
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setStatus(options[index])
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

  const addClientRecord = async ()=> {
    
if (clientName === "" || amount === "" || status === "") {
return toastAlert({
    type: "error",
    message: "Missing Field"
})

}

try {
    const response = await axios.post("http://localhost:8000/clientRecords/", {
    clientName,
    amount,
    status,
    date: new Date().toDateString()
}, {
headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }}
)

toastAlert({
    type: "success",
    message: response.data.message
})
setClientName("")
setAmount("")
setRefreshRecords(prev => !prev);
document.getElementById('my_modal_3').close();
} catch (error) {
toastAlert({
    type: "error",
          message: error.response.data.message
})    
}
  }

const getRecords = async ()=> {
    try {
        const response = await axios.get("http://localhost:8000/clientRecords/", {
            headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
        })
        setPaymentRecords(response.data.data)
    } catch (error) {
        console.log (error.response.data.message)
    }
}

useEffect(()=> {
    getRecords()
}, [refreshRecords])


return (
    <>
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
                              <li><Link to="/recordEntry">TRANSACION</Link></li>
                              {/* <li><a href="" className="btn-primary">+ New Client</a></li> */}
                              <button className="btn" style={{
                                marginLeft: "15px"
                              }} onClick={()=>document.getElementById('my_modal_3').showModal()}>+ Add Client</button>
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

    <Typography sx={{marginTop: "25px"}}>Client Name</Typography>
    <TextField sx={{width: "100%", marginTop: "10px"}} value={clientName} onChange={(e)=> setClientName(e.target.value)} id="outlined-basic" label="Client Name" variant="outlined" />
    <Typography sx={{marginTop: "25px"}}>Amount</Typography>
    <TextField sx={{width: "100%", marginTop: "10px"}} type='number' value={amount} id="outlined-basic" label="Amount" onChange={(e)=> setAmount(e.target.value)} variant="outlined" />


<ButtonGroup
  variant="contained"
  ref={anchorRef}
  aria-label="Button group with a nested menu"
  sx={{ marginTop: "20px", boxShadow: "0"}}
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
    width:"100%",
    alignSelf: "center",
    mt: "30px",
    borderRadius: "10px",
height: "50px"
}} onClick={addClientRecord}>add Record</Button>
            </Stack>

  </div>
</dialog>

<div style={{
  marginTop: "20px"
}}>
  <Card 
   handleUpdate={ async (id) =>{
document.getElementById('my_modal_4').showModal()
const response = await axios.get("http://localhost:8000/clientRecords/", {
            headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
        })

      const filteredRecord = response.data.data.find((record)=> {
return record._id === id
        })

        setFilteredClientName(filteredRecord.clientName)
        setFilteredAmount(filteredRecord.amount)

   }}  
  handleDelete={(id) =>{
       try {
        axios.delete(`http://localhost:8000/clientRecords/${id}`)
        toastAlert({
          type: "success",
          message: "record deleted successfully"
        })
       setRefreshRecords(prev => !prev);
       } catch (error) {
        toastAlert({
          type: "error",
          message: response.data.message
        })
       }
  }}  
  paymentRecords={paymentRecords}
  filteredClientName={filteredClientName}
  filteredAmount={filteredAmount}
  setRefreshRecords={setRefreshRecords}
  />
</div>

    </>
)

}

export default Client