import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toastAlert } from "../utils"
import axios from "axios"

const Login = ()=> {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginHandler = async (e)=> {
e.preventDefault()

  if (email === "" || password === "") {
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

        try {
            
            const response = await axios.post("https://fin-tracker-five-virid.vercel.app/auth/login", {
                email,
                password
            })
            localStorage.setItem("token", response.data.token)
            toastAlert({
                type: "success",
                message: "user logged in successfully"
            })

            navigate("/home")

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

            <h1>Welcome Back</h1>
            <p>Login to your account</p>
        </div>
        
        <div className="form-container">
            <form onSubmit={loginHandler}>
                <div className="input-group">
                    <label>Email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email"/>
                </div>
                
                <div className="input-group">
                    <label>Password</label>
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" id="password" placeholder="Enter your password"/>
                </div>
                
                <button type="submit" className="authBtn">Login</button>
            </form>
            
            <div className="footer-text">
                Don't have an account? <Link to="/">Sign Up</Link>
            </div>
        </div>
    </div>
</div>
    </>
}

export default Login