import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing";
import NewEnquiry from "./pages/NewEnquiry";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Enquiries from "./pages/Enquiries";
import NewAccount from "./pages/NewAccount";
import Accounts from "./pages/Accounts";

import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";

import Navbar from "./components/Navbars/Navbar";
import AdminNavbar from "./components/Navbars/AdminNavbar";
import ProjectNavbar from "./components/Navbars/ProjectNavbar";

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
                        <Route to="/" element={<ProjectNavbar />}>
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/new-project" element={<NewProject />} />
                            <Route path="/projects/:id" element={<ProjectDetails />} />
                        </Route>
                        <Route path="/" element={<AdminNavbar />}>
                            <Route path="/enquiries" element={<Enquiries />} />
                            <Route path="/new-account" element={<NewAccount />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;