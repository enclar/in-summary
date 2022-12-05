import { useReducer, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import dashboardReducer from "./reducer/dashboardReducer";

import Landing from "./pages/Landing";
import Enquiry from "./pages/Enquiry";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";

import Navbar from "./components/Navbar";

export const DataContext = createContext();

const App = () => {
    const [dashboard, dispatch] = useReducer(dashboardReducer, {
        list: []
    });

    return (
        <div>
            <DataContext.Provider value={{ dashboard, dispatch }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/enquiry" element={<Enquiry />} />
                        <Route path="/" element={<Navbar />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/new-user" element={<NewUser />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DataContext.Provider>
        </div>
    )
}

export default App;