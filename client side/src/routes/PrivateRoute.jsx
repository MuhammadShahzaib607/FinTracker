import { Navigate, Outlet } from "react-router-dom"
import Modal from "../components/Modal"

const PrivateRoute = ()=> {
    return (
      localStorage.getItem("token") ? <Outlet /> : <Modal />
    )
}

export default PrivateRoute