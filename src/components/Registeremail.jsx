import { useEffect, useState } from "react";
import PageHeader from "../Layout/PageHeader";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth, db} from "../Firebase"
import { toast } from "react-toastify";
import axios from "axios";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
export default function Registeremail(){
    var[name,setName]=useState("");
    var[email,setEmail]=useState("");
    var[Password,setPassword]=useState("");
    var[contact,setcontact]=useState("");
    var[address,setaddress]=useState("");
    var[education,seteducation]=useState("");
    var[image,setimage]=useState("");
    var[url,setUrl]=useState("")
    const nav = useNavigate()
  const signUpWithGoogle = ()=>{
            let provider =new GoogleAuthProvider()
            signInWithPopup(auth,provider)
            .then((userCreds)=>{
                    savedata(userCreds.user.uid,userCreds.user.email,userCreds.user.displayName)
                    toast.success("Sign in successfully!!")
                })
            .catch((err)=>{
                    toast.error(err.message)
            })
  }
   function handleform(e){
            e.preventDefault()
            signInWithEmailAndPassword(auth,email,Password)
            .then((userCre)=>{
                    savedata(userCre.user.uid,email,name)
                    toast.success("User Registered!!")
            })
            .catch((err)=>{
                    toast.error(err.message)
            })
  }
  let savedata = async(uid,email,name)=>{
            let data = {
                name:name,
                userId:uid,
                userType:2,
                email:email,
                status:true,
                createdAt:Timestamp.now()
            }
            await setDoc(doc(db,"users",uid),data)
            .then(()=>{
                    sessionStorage.setItem("isLogin",true)
                    sessionStorage.setItem("name",name)
                    sessionStorage.setItem("email",email)
                    sessionStorage.setItem("userId",uid)
                    sessionStorage.setItem("userType",2)
                    nav("/")
            })
            .catch((err)=>{
                    toast.error(err.message)
            })
  }
 
    return(
      <>
      <PageHeader child={"Register "}/>
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-4">
            <div className="offset-md-2 col-md-8 shadow p-5">
                <form onSubmit={handleform}>
                    <div className="row g-3">
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            />
                            <label htmlFor="name">Your Name</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                              value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            <label htmlFor="email">Your Email</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input
                            type="password"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                              value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <label htmlFor="subject">Password</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                             <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                              value={contact}
                            onChange={(e)=>{setcontact(e.target.value)}}
                            />
                            <label htmlFor="message">Contact</label>
                        </div>
                        </div>
                        
                         <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                type="text"
                                className="form-control"
                                id="subject"
                                placeholder="Subject"
                                  value={address}
                                onChange={(e)=>{setaddress(e.target.value)}}
                                />
                                <label htmlFor="message">Address</label>
                            </div>
                        </div>
                         <div className="col-md-6">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={education}
                            onChange={(e)=>{seteducation(e.target.value)}}
                            />
                            <label htmlFor="message">Education</label>
                        </div>
                        </div>
                         <div className="col-md-12">
                        <div className="form-floating">
                            <input
                            type="file"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            onChange={(e)=>{setimage(e.target.files[0])}}
                            />
                            <label htmlFor="message">image</label>
                        </div>
                        </div>
                     
                        <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                            Register
                        </button>
                         <button type="button" className="my-3 w-100 btn btn-outline-danger py-3" onClick={signUpWithGoogle}>Sign up with Google</button>
                        </div>
                    </div>
                    </form>

            </div>
      </div>
    </div>
  </div>
</>

    )
}