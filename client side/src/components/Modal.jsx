import { Link } from "react-router-dom"


const Modal = ()=> {
        return (
            <>
    <input type="checkbox" id="my_modal_7" className="modal-toggle" checked readOnly />
    <div className="modal" role="dialog">
    <div className="modal-box">
        <div  style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
        }}>
            <img src="/lockIcon.png" style={{
            height: "60px"
        }} alt="" />
        <h3  style={{
       marginTop: "20px",
    transform: "translateX(-13px)"
        }} className="text-lg font-bold">Sign in Required</h3>
        </div>

<div className="line"></div>

        <p className="py-4">To access FinTracker’s powerful tools and make the most of your experience, please sign in or create a free account. By joining, you’ll get:</p>

    <ul className="modalLists">
        <li className="modalList">Access to real-time rate comparisons</li>
        <li className="modalList">Personalized financial recommendations</li>
        <li className="modalList">The ability to save and track your preferred rates</li>
    </ul>

<Link to={"/login"} className="modalBtn">Sign In</Link>
<Link to={"/"} className="modalBtn2">Create Account</Link>

    </div>
    </div>
            </>
        )
    }

    export default Modal