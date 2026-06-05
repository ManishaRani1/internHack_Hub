import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";
import PageHeader from "../../Layout/PageHeader";


export default function ParticipatedHackathon() {

    const [description, setDescription] = useState("")
    const [Attachment, setAttachment] = useState("")
    const [HachathonsData, setHachathonsData] = useState([])
    const [load, setLoad] = useState(true);
    // const nav=useNavigate();

    const { id } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("isLogin") == null) {
            toast.warning("Please Login First")
            setTimeout(() => {
                nav("/login")
            }, 1500);
        }
        onSnapshot(doc(db, "hackathons", id), (savedData) => {
            setHachathonsData(savedData.data());

        })
        setLoad(false)
    }, [])


    const handleSubmit = async (e) => {
        setLoad(true)
        e.preventDefault();

        if (!Attachment) return toast.warning("Please upload an attachment");

        const formData = new FormData();
        formData.append("file", Attachment);
        formData.append("upload_preset", "Newfloder");


        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dqhhessok/image/upload`,
                formData
            );
            saveData(response.data.secure_url)
           
        } catch (error) {
            setLoad(false)
            toast.error("Error uploading image:", error.message);
        }


    };

    const saveData = async (URL) => {
        try {


            await addDoc(collection(db, "hackathonsParticipation"), {
                title: HachathonsData.title,
                hackathonId: id,
                userId: sessionStorage.getItem("userId"),
                email: sessionStorage.getItem("email"),
                location: HachathonsData.location,
                mode: HachathonsData.mode,
                schedule: HachathonsData.schedule,
                scholarship: HachathonsData.scholarship,
                description,
                attachment: URL,
                status: false,
                createdAt: serverTimestamp()
            });

            toast.success("Hackathon added successfully!");
            setDescription("");
            setAttachment(null);
            setLoad(false)
            setTimeout(() => {
                nav("/myhackathons")
            }, 1500);;
        } catch (err) {
            toast.error("Failed to add hackathon.");
            console.error(err);
        }
    }

    return (

     <> 
     <ToastContainer/>
     <PageHeader child={"Apply Hackathon"}/>
            {
                load ?

                    <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%" }
                    } size={150} />


                    :

                    <div className="container my-5">

                        <h2 className="mb-4 text-center">Apply Hackathon</h2>
                        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">


                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" rows="3" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Attachment (Only Image/Video)</label>
                                <input type="file" className="form-control" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={(e) => setAttachment(e.target.files[0])} required />
                            </div>

                            <button type="submit" className="btn btn-primary w-100" >
                               Apply
                            </button>
                        </form>
                    </div>
            }
     </>
    );
}
