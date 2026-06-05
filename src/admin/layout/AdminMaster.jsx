import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import Footer from "../../Layout/Footer";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminMaster(){
    const nav=useNavigate()
    useEffect(()=>{
        const userType=sessionStorage.getItem("userType")
        if(userType!=1){
            toast.warning("Please Login as Admin")
            setTimeout(() => {
                nav("/login")
                
            }, 1500);
        }
    })
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <Footer/>
        </>
    )
}