import { useState } from "react";
import PageHeader from "../Layout/PageHeader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
    import { Link, useNavigate } from "react-router-dom";
import {  RingLoader } from "react-spinners";

export default function Login(){
    var[email,setEmail]=useState("")
    var[password,setPassword]=useState("")
    var[load,setLoad]=useState(false)
    const nav = useNavigate()
    function handleForm(e){
        setLoad(true)
            e.preventDefault()
            signInWithEmailAndPassword(auth,email,password)
            .then(async(usercred)=>{
                console.log("userCred",usercred);
                console.log("Login UID:",usercred.user.uid);
                // const docRef = doc(db, "users", usercred.user.uid);
                // const docSnap = await getDoc(docRef);
                sessionStorage.setItem("isLogin", true)
                sessionStorage.setItem("email", email)
                sessionStorage.setItem("userId", usercred.user.uid)
                const docRef=doc(db, "users", usercred.user.uid)
                const docSnap =await getDoc(docRef) 
                console.log("Document exists:",docSnap.exists());
                 if(docSnap.exists()){
                        let data = docSnap.data()
                        sessionStorage.setItem("name",data.name)
                        sessionStorage.setItem("userType",data.userType)
                        toast.success("Login successfully!!!")
                        if(data.userType == 1){
                            setTimeout(()=>{
                                setLoad(false)
                                nav("/admin")
                            },3000)
                        }
                        else{
                            setTimeout(() => {
                                setLoad(false)
                                
                                nav("/")
                            }, 3000);
                        }
                    }
                    else{
                        setLoad(false)
                        toast.error("User record not found in Firestore")
                    }
                })
                .catch((err)=>{
                setLoad(false)
                toast.error("Invalid creeds")
                        console.log("err is",err);
                        
            })
    }
    return(
      <>
      <PageHeader child={"Login "}/>
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
                    <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%", color: "skyblue" }} size={150} />            {
                !load?
                            <div className="row g-4">
            <div className="offset-md-3 col-md-6 shadow p-5">
                <form onSubmit={handleForm}>
                    <div className="row g-3">
                        <div className="col-md-12">
                        <div className="form-floating">
                            <input 
                            required
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
                        <div className="col-md-12">
                        <div className="form-floating">
                            <input 
                            required
                            type="password"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}

                            />
                            <label htmlFor="email">Your Password</label>
                        </div>
                        </div>
                        <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                            Submit
                        </button>
                        </div>
                    </div>
                    </form>
                    <p>Don't have any account <span><Link to={"/register"}>Register</Link></span></p>

            </div>
      </div>
                
                :""
            }
      
    </div>
  </div>
</>

    )
}