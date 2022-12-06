import { useReducer, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing";
import NewEnquiry from "./pages/NewEnquiry";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Enquiries from "./pages/Enquiries";
import NewUser from "./pages/NewUser";

import Navbar from "./components/Navbar";

export const DataContext = createContext();

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/enquiry" element={<NewEnquiry />} />
                    <Route path="/" element={<Navbar />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/enquiries" element={<Enquiries />} />
                        <Route path="/new-user" element={<NewUser />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;