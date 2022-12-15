import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing";
import NewEnquiry from "./pages/NewEnquiry";
import Login from "./pages/Login";

import Enquiries from "./pages/Enquiries";
import NewAccount from "./pages/NewAccount";
import AllAccounts from "./pages/AllAccounts";
import ClientDetails from "./pages/ClientDetails";

import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import Notes from "./pages/Notes";
import Images from "./pages/Images";

import Inventory from "./pages/Inventory";
import NewInventory from "./pages/NewInventory";

import Navbar from "./components/Navbars/Navbar";
import AdminNavbar from "./components/Navbars/AdminNavbar";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/enquiry" element={<NewEnquiry />} />
                    <Route path="/" element={<Navbar />}>
                        <Route path="/unauthorized" element={<Unauthorized />} />

                        <Route path="/projects" element={<Projects />} />
                        <Route path="/new-project" element={<NewProject />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="/projects/:id/notes" element={<Notes />} />
                        <Route path="/projects/:id/images" element={<Images />} />

                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/new-inventory" element={<NewInventory />} />

                        <Route path="/" element={<AdminNavbar />}>
                            <Route path="/enquiries" element={<Enquiries />} />
                            <Route path="/new-account" element={<NewAccount />} />
                            <Route path="/all-accounts" element={<AllAccounts />} />
                            <Route path="/clients/:id" element={<ClientDetails />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;