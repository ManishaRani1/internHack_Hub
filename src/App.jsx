import { BrowserRouter, Route, Routes } from "react-router-dom"
import Master from "./Layout/Master"
import Home from "./components/Home"
import About from "./components/About"
import Courses from "./components/Courses"
import Team from "./components/Team"
import ErrorPage from "./Layout/ErrorPage"
import Login from "./components/Login"
import Register from "./components/Register"
import Registeremail from "./components/Registeremail"
import AdminMaster from "./admin/layout/AdminMaster"
import AddInternship from "./admin/components/AddInternship"
import Dashboard from "./admin/components/Dashboard"
import ManageIntership from "./admin/components/ManageInternship"
import { ToastContainer } from "react-toastify"
import UpdateInterShip from "./admin/components/UpdateInterShip"
import AddHackathon from "./admin/components/AddHackathons"
import ManageHackathon from "./admin/components/ManageHackathons"
import UpdateHackathon from "./admin/components/UpdateHackathons"
import Interships from "./components/Pages/InternShips"
import ManageApplications from "./admin/components/ManageApplications"
import Viewinternship from "./components/Pages/ViewInternShips"
import Hackathons from "./components/Pages/hackathons"
import ParticipatedHackathon from "./components/Pages/ParticipatedHackathons"
import ManagehackaParticipation from "./admin/components/hackathonsParticipation"
import UserHackathonParticipation from "./components/Pages/MyHackathons"
import Contact from "./components/Pages/Contact"
import ManageContacts from "./admin/components/ManageContacts"
import ResumeAnalyzer from "./components/ResumeAnalyzer"
import ManageUsers from "./admin/components/ManageUsers"





function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Master />}>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/courses" element={<Courses />}></Route>
                        <Route path="/team" element={<Team />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/registere" element={<Registeremail />}></Route>
                        

                        <Route path="/internship" element={<Interships />}></Route>
                        <Route path="/viewinternship" element={<Viewinternship />}></Route>
                        <Route path="/hackathons" element={<Hackathons />}></Route>
                        <Route path="/hackathons/:id" element={<ParticipatedHackathon />}></Route>
                        <Route path="/myhackathons" element={<UserHackathonParticipation />}></Route>
                        <Route path="/contact" element={<Contact />}></Route>
                          <Route path="/resumeanalyzer" element={<ResumeAnalyzer />}></Route>
                          

                        
                    </Route>
                        <Route path="/admin" element={<AdminMaster />}>
                        <Route index element={<Dashboard />}></Route>
                        <Route path="addinternship" element={<AddInternship />}></Route>
                        <Route path="manageIntership" element={<ManageIntership />}></Route>
                        <Route path="UpdateInternship/:id" element={<UpdateInterShip />}></Route>

                        <Route path="addhackathons" element={<AddHackathon />}></Route>
                        <Route path="managehackathons" element={<ManageHackathon />}></Route>
                        <Route path="UpdateHackathon/:id" element={<UpdateHackathon />}></Route>
                        <Route path="Applications" element={<ManageApplications />}></Route>
                        <Route path="manageusers" element={<ManageUsers />}></Route>
                        


                        <Route path="hackathonsParticipation" element={<ManagehackaParticipation />}></Route>
                        <Route path="manageContact" element={<ManageContacts />}></Route>
                    </Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </BrowserRouter>

            <ToastContainer />
        </>
    )
}

export default App
