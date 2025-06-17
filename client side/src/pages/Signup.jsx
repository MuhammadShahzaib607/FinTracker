import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bounce, toast } from "react-toastify"
import { toastAlert } from "../utils"
import axios from "axios"

const Signup = ()=> {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const signupHandler = async (e)=> {
        e.preventDefault()

        if (userName === "" || email === "" || password === "" || confirmPassword === "") {
            return toastAlert({
                type: "error",
                message: "Missing Fields"
            })
        }

        if (!email.endsWith("@gmail.com")) {
            return toastAlert({
                type: "error",
                message: "Please enter a valid email address"
            })
        }

        if (password.length < 8) {
            return toastAlert({
                type: "error",
                message: "password should be 8 character long"
            })
        }

       if (password !== confirmPassword) {
        return toastAlert({
            type: "error",
            message: "password do not match!"
        })
       }

try {

       const response = await axios.post("http://localhost:8000/auth/signup", {
        userName,
        email,
        password
       })

       toastAlert({
    type: "success",
    message: "user registered successfully"
})

navigate("/login")
        
} catch (error) {
    toastAlert({
        type: "error",
        message: error.response.data.message
    })
}



    }


   return  <>
<div className="authMainContainer">
    <div className="authContainer">
        <div className="authHeader">
            <div className="authLogo" style={{
                margin: "0"
            }}>
               <img src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-business-finance-logo-arrow-up-account-vector-picture-image_9798642.png" style={{
                height: "70px",
               }} alt="" />
            </div>
            <h1 style={{
                marginTop: "0px"
            }}>Welcome to FinTracker</h1>
            <p>Create a new account</p>
        </div>
        
        <div className="form-container">
            <form onSubmit={signupHandler}>
                <div className="input-group">
                    <label>User Name</label>
                    <input type="text" id="name" onChange={(e)=> setUserName(e.target.value)} placeholder="Enter your user name" />
                </div>
                
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" id="email" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password" />
                </div>
                
<div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" id="confirmPassword" onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="confirm password" />
                </div>

                <button type="submit" className="authBtn">Sign Up</button>
            </form>
            
            <div className="footer-text">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    </div>
</div>
    </>
}

export default Signup