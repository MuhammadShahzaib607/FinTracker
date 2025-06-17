import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = ()=> {
    return (
      !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/home" />
    )
}

export default AuthRoute