import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { RingLoader } from "react-spinners";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Hackathons() {
    const [load, setLoad] = useState(true);
    const [AllHackathons, setAllHackathons] = useState([]);
    const [Participents, setParticipents] = useState([]);
    
    
    const nav=useNavigate()

    useEffect(() => {
    
        
        if(sessionStorage.getItem("isLogin")==null){
            toast.warning("Please Login First")
            setTimeout(() => {
                nav("/login")
            }, 1500);
        }
    

        // setLoad(true);
       onSnapshot(collection(db, "hackathons"), (snapshot) => {
            setAllHackathons(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
            console.log(snapshot.docs[0].id);
            
            setLoad(false);
        });
        
        onSnapshot(query(collection(db, "hackathonsParticipation"),where("userId","==",sessionStorage.getItem("userId"))),(doc)=>{
            setParticipents( doc.docs.map((el)=>{
                console.log("data",el.data());
                return {id:el.id, ...el.data()}
                
            }))
            setLoad(false);
        })
       
       


    }, []);

    return (
        <>
            <PageHeader child={"Hackathons"} />
            <ToastContainer/>

            {!load ? (
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">
                                Hackathons
                            </h6>
                            <h1 className="mb-5">Available Hackathons</h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {AllHackathons.map((el) => (
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={el.id}>
                                    <div className="course-item bg-light">
                                        <div className="text-center p-4 pb-0">
                                            <h3 className="mb-2">{el.title}</h3>
                                            <p className="mb-1"><strong>Location:</strong> {el.location}</p>
                                            <p className="mb-1"><strong>Mode:</strong> {el.mode}</p>
                                            <p className="mb-1"><strong>Schedule:</strong> {new Date(el.schedule).toLocaleString()}</p>
                                            <p className="mb-1"><strong>Scholarship:</strong> ₹{el.scholarship}</p>
                                            <p className="mb-1"><strong>Status:</strong> {el.status ? "Active" : "Inactive"}</p>
                                            <p className="mb-2"><strong>Description:</strong> {el.description}</p>
                                            {
                                                el.status?

                                                Participents?.some((e)=> e.hackathonId === el.id)?
                                                ""
                                                :
                                                        <Link
                                                            to={"/hackathons/" + el.id}
                                                            className="btn btn-primary rounded-pill px-4 mb-3"
                                                            onClick={() => ApplyNow(el)}
                                                        >
                                                            Apply Now
                                                        </Link>
                                                   
                                                :
                                                    <button
                                                        disabled
                                                        className="btn btn-primary rounded-pill px-4 mb-3"
                                                       
                                                    >
                                                        closed
                                                    </button>
                                            }
                                            
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center py-2">
                                                <i className="fa fa-calendar text-primary me-2"></i>
                                                {new Date(el.createdAt?.seconds * 1000).toLocaleDateString()}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%" }} size={150} />
            )}
        </>
    );
}
