import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader"
import { auth, db } from "../../Firebase"
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { collection, doc, onSnapshot, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { RingLoader } from "react-spinners";
export default function UpdateInterShip() {
    var [title, settitle] = useState("");
    var [category, setcategory] = useState("");
    var [image, setimage] = useState("");
    var [url, setUrl] = useState("")
    var [description, setDescription] = useState("");
    var [company, setcompany] = useState("");
    var [duration, setduration] = useState("");
    var [deadline, setdeadline] = useState("");
    var [location, setlocation] = useState("");
    var [eligibility, seteligibility] = useState("");
    var [contactdetails, setcontactdetails] = useState("");
    var [load, setLoad] = useState(true)
    const {id}=useParams()
    const nav=useNavigate()





    useEffect(()=>{
        onSnapshot(doc(db,"intenships",id),(Internship)=>{
            console.log(Internship.data());
            
            const InternData = Internship.data()
            console.log(InternData.image);
            settitle(InternData.title || "");
            setcategory(InternData.category || "");
            // setimage(InternData.image || "");
            setUrl(InternData.image || "");
            setDescription(InternData.description || "");
            setcompany(InternData.company || "");
            setduration(InternData.duration || "");
            setdeadline(InternData.deadline || "");
            setlocation(InternData.location || "");
            seteligibility(InternData.eligibility || "");
            setcontactdetails(InternData.contactdetails || "");


            setLoad(false)
            
        })
    },[])








    var handleform = async (e) => {
        e.preventDefault()
        setLoad(true)
        let filedata = new FormData();
        filedata.append("file", image);
        filedata.append("upload_preset", "internX");
        await axios.post("https://api.cloudinary.com/v1_1/dd9ipyppz/image/upload", filedata)
        .then((imgRes) => {
            saveData(imgRes.data.secure_url)
            setLoad(false)
        })
        .catch((err) => {
            // toast.error(err.message)
            saveData(url)
            setLoad(false)
            })
    }

    const saveData = async (Url) => {
        setLoad(true)
        let data = {
            title: title,
            category,
            image: Url,
            description,
            company,
            duration,
            deadline,
            location,
            eligibility,
            contactdetails,
            // status: true,
            createdAt: Timestamp.now()
        };
        const docRef = doc(db, "intenships",id); // auto-generated ID
        await updateDoc(docRef, data)
            .then(() => {
                toast.success("Data Updated")
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

                setTimeout(() => {
                    setLoad(false)
                    nav("/admin/manageIntership")
                }, 1500);
            })
            .catch((err) => {
                setLoad(false)
                toast.error(err.message)
            })
       

    }
    



    return (
        <>
        <ToastContainer/>
            <PageHeader child={"Update Internship"} />
            {/* Service Start */}
            <div className="container-xxl py-5">
                <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%", color: "skyblue" }} size={150} />
                {
                    !load ?
                        <div className="container">
                            <div className="row g-4 justify-content-center">
                                <div className="col-3">
                                    <img src={url} width={100} className="img-fluid" alt="" />
                                    {/* <p>{url}</p> */}
                                </div>
                                <div className=" col-md-10 shadow p-5">
                                    
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
                                                        onChange={(e) => { settitle(e.target.value) }}
                                                    />
                                                    <label htmlFor="name">Title</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <select value={category} required onChange={(e) => { setcategory(e.target.value) }} className="form-control">
                                                        <option selected disabled>Select Category</option>
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
                                                    <input 
                                                       
                                                        type="file"
                                                        className="form-control"
                                                        id="subject"
                                                        placeholder="Subject"
                                                        onChange={(e) => { setimage(e.target.files[0]) }}
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
                                                        onChange={(e) => { setcompany(e.target.value) }}
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
                                                        min={deadline}
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
                                                        onChange={(e) => { seteligibility(e.target.value) }}
                                                    />
                                                    <label htmlFor="subject">Eligibility</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input required
                                                        type="tel"
                                                        className="form-control"
                                                        id="subject"
                                                        minLength={10}
                                                        maxLength={10}
                                                        placeholder="Subject"
                                                        value={contactdetails}
                                                        onChange={(e) => { setcontactdetails(e.target.value) }}
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
                                                        onChange={(e) => { setlocation(e.target.value) }}
                                                    />
                                                    <label htmlFor="subject">location</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating">
                                                    <textarea
                                                    required
                                                        className="form-control"
                                                        id="subject"
                                                        value={description}
                                                        onChange={(e) => { setDescription(e.target.value) }}
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
                                                        onChange={(e) => { setduration(e.target.value) }}
                                                    />
                                                    <label htmlFor="message">Duration</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 py-3" type="submit">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        : ""}
            </div>
        </>

    )
}