import {
  Routes,
  Route
} from "react-router-dom"
import Client from './pages/Client.jsx';
import HomePage from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from "./pages/Signup.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import AuthRoute from "./routes/AuthRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RecordEntry from "./pages/RecordEntry.jsx";

function App() {

    return (
<>

    <Routes>

<Route element={<PrivateRoute />}>
<Route path="/home" element={<HomePage />}/>
<Route path="/client" element={<Client />}/>
<Route path="/recordEntry" element={<RecordEntry />}/>
</Route>


<Route element={<AuthRoute />}>
<Route path="/" element={<Signup />}/>
<Route path="/login" element={<Login />}/>
</Route>

</Routes>

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>


    </>
  );
}

export default App;
