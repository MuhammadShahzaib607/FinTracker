import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

const ClientAnalytics = () => {

const [records, setRecords] = useState([])

    const navigate = useNavigate()

    const logout = ()=> {
        console.log ("logout chala")
    localStorage.removeItem("token");
    navigate("/login")
    }

const getRecords = async ()=> {
    try {
        const response = await axios.get("https://fin-tracker-five-virid.vercel.app/clientRecords/", {
            headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
        })
        console.log(response.data.data)
        setRecords(response.data.data)
    } catch (error) {
        console.log (error.response.data.message)
    }
}

useEffect(()=> {
    getRecords()
}, [])

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { amount, status } = payload[0].payload;
    return (
      <div style={{
        backgroundColor: "#fff",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}>
        <p><strong>Client:</strong> {label}</p>
        <p><strong>Amount:</strong> Rs. {amount.toLocaleString()}</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
    );
  }
  return null;
};


  return (
    <div className='analytics'>
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
                                      <li><Link to="/client">TRANSACTION</Link></li>
                                         <Button variant="text" style={{
                            marginLeft: "10px"
                          }} onClick={logout}>Logout</Button>
                                  </ul>
                              </nav>
                          </div>
                      </header>

<div className="chartContainer">
      <LineChart width={1300} height={400} data={records} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
    <Line type="monotone" dataKey="amount" stroke="purple" strokeWidth={2} name="Amount" />
    <XAxis dataKey="clientName" interval={Math.floor(records.length / 6)} />
    <YAxis width="auto" label={{position: 'insideLeft', angle: -90 }} tickFormatter={(value) => value.toLocaleString()} />
    <Tooltip content={<CustomTooltip />} />
  </LineChart>
</div>

    </div>  
  )
}

export default ClientAnalytics