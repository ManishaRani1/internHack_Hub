import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader"
import {auth, db} from "../../Firebase"
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { RingLoader } from "react-spinners";
export default function AddInternship(){
    var[title,settitle]=useState("");
    var[category,setcategory]=useState("");
    var[image,setimage]=useState("");
    var[url,setUrl]=useState("")
    var[description,setDescription]=useState("");
    var[company,setcompany]=useState("");
    var[duration,setduration]=useState("");
    var[deadline,setdeadline]=useState("");
    var[location,setlocation]=useState("");
    var[eligibility,seteligibility]=useState("");
    var[contactdetails,setcontactdetails]=useState("");
    var[load,setLoad]=useState(false)
    const nav=useNavigate()


    var handleform = async(e)=>{
        setLoad(true)
        e.preventDefault()
        let filedata = new FormData();
        filedata.append("file", image);
        filedata.append("upload_preset", "internX");
        await axios.post("https://api.cloudinary.com/v1_1/dd9ipyppz/image/upload", filedata)
        .then((imgRes)=>{
            setUrl(imgRes.data.secure_url)    
        })
        .catch((err)=>{
            toast.error(err.message)
        })
    }
    
    const saveData = async () => {
        let data = {
            title:title,
            category,
            image:url,
            description,
            company,
            duration,
            deadline,
            location,
            eligibility,
            contactdetails,
            status: true,
            createdAt: Timestamp.now()
        };
        const docRef = doc(collection(db, "intenships")); // auto-generated ID
        await setDoc(docRef, data)
        .then(()=>{
            toast.success("Data added")

            setTimeout(() => {
                setLoad(false)
                nav("/admin/manageIntership")
            }, 1500);
            // setLoad(true)
            settitle("")
            setDescription("")
            setcategory("")
            setcompany("")
            setdeadline("")
            setDescription("")
            setlocation("")
            seteligibility("")
            setcontactdetails("")
        })
        .catch((err)=>{
            setLoad(false)
            toast.error(err.message)
        })
        

}
useEffect(()=>{
    if(!!url){
        saveData()
    }
},[url])


  
    return(
      <>
      <ToastContainer/>
      <PageHeader child={"Add Internship"}/>
  {/* Service Start */}
  <div className="container-xxl py-5">
                <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%", color: "skyblue" }} size={150} />
            {
                !load?
    <div className="container">
      <div className="row g-4">
            <div className="offset-md-2 col-md-8 shadow p-5">
                <form onSubmit={handleform}>
                    <div className="row g-3">
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input required 
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={title}
                            onChange={(e)=>{settitle(e.target.value)}}
                            />
                            <label htmlFor="name">Title</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                           <select value={category} required onChange={(e)=>{setcategory(e.target.value)}} className="form-control">
                                <option value="" selected disabled>Select Category</option>
                                <option value="paid">paid</option>
                                <option value="unpaid">unpaid</option>
                                <option value="fulltime">fullTime</option>
                                <option value="halftime">halfTime</option>
                           </select>
                            <label htmlFor="email">Category</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input required 
                            type="file"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            onChange={(e)=>{setimage(e.target.files[0])}}
                            />
                            <label htmlFor="subject">image</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input required 
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={company}
                            onChange={(e)=>{setcompany(e.target.value)}}
                            />
                            <label htmlFor="subject">company</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                                                    <input
                                                        required
                                                        type="date"
                                                        className="form-control"
                                                        id="subject"
                                                        placeholder="Subject"
                                                        value={deadline}
                                                        onChange={(e) => setdeadline(e.target.value)}
                                                        min={new Date().toISOString().split("T")[0]}
                                                    />
                            <label htmlFor="subject">Deadline</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input required 
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={eligibility}
                            onChange={(e)=>{seteligibility(e.target.value)}}
                            />
                            <label htmlFor="subject">Eligibility</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                                                    <input
                                                        required
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Contact"
                                                        minLength={10}
                                                        maxLength={10}
                                                        value={contactdetails}
                                                        pattern="[0-9]{10}"
                                                        title="Please enter a valid 10-digit contact number"
                                                        onChange={(e) => {

                                                            const value = e.target.value.replace(/\D/g, "");
                                                            setcontactdetails(value);
                                                        }}
                                                    />
                            <label htmlFor="subject">contact details</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                            <input required 
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={location}
                            onChange={(e)=>{setlocation(e.target.value)}}
                            />
                            <label htmlFor="subject">location</label>
                        </div>
                        </div>
                         <div className="col-md-12">
                        <div className="form-floating">
                            <textarea
                            className="form-control"
                            id="subject"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            />
                            <label htmlFor="message">Description</label>
                        </div>
                        </div>
                         <div className="col-md-12">
                        <div className="form-floating">
                            <textarea
                            className="form-control"
                            id="subject"
                            value={duration}
                            onChange={(e)=>{setduration(e.target.value)}}
                            />
                            <label htmlFor="message">Duration</label>
                        </div>
                        </div>
                     
                        <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                            Add
                        </button>
                        </div>
                    </div>
                    </form>

            </div>
      </div>
    </div>
    :""}
  </div>
</>

    )
}