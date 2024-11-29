import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Start } from "../Pages/Start.jsx";
import { Register } from "../Pages/Register.jsx";
import { Chat } from "../Pages/Chat.jsx";
import { Admin } from "../Pages/Admin.jsx"

export default function AppRouter(){

    return(
        <Router>
            <Routes>

                <Route path="/" element={<Start/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Chat" element={<Chat/>} />
                <Route path="/Admin" element={<Admin/>} />

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </Router>
    )

}