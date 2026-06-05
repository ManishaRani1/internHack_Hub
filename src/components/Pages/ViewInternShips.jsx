import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

export default function Viewinternship() {
    const [load, setLoad] = useState(true);
    const [applications, setApplications] = useState([]);
    const nav=useNavigate()

    useEffect(() => {

         if(sessionStorage.getItem("isLogin")==null){
                    toast.warning("Please Login First")
                    setTimeout(() => {
                        nav("/login")
                    }, 1500);
                }
                
        const fetchData = () => {
            setLoad(true);
            onSnapshot(query(collection(db, "ApplyInternShip"),where("email","==",sessionStorage.getItem("email"))), (snapshot) => {
                const result = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setApplications(result);
                setLoad(false);
            });
        };

        fetchData();
    }, []);

    // const changeStatus = async (id, currentStatus) => {
    //     await updateDoc(doc(db, "ApplyInternShip", id), { status: !currentStatus })
    //         .then(() => toast.success("Status updated"))
    //         .catch(() => toast.error("Failed to update status"));
    // };

    // const deleteApplication = async (id) => {
    //     await deleteDoc(doc(db, "ApplyInternShip", id))
    //         .then(() => toast.success("Application deleted"))
    //         .catch((err) => toast.error(err.message));
    // };

    // const changeAppStatus=async(id,status)=>{
    //     console.log(id,status);
    //     if (status =="Applied"){
    //       await updateDoc(doc(db, "ApplyInternShip", id), { AppStatus: "Short-Listed" })
    //           .then(() => toast.success("Status updated"))
    //           .catch(() => toast.error("Failed to update status"));
    //   }
    //     else if (status =="Short-Listed"){
    //         await updateDoc(doc(db, "ApplyInternShip", id), { AppStatus: "Selected" })
    //             .then(() => toast.success("Status updated"))
    //             .catch(() => toast.error("Failed to update status"));
    //   }
    //   else{
    //     toast.error("Appication status not updated")
    //   }
        
    // }

    return (
        <>
            <PageHeader child={"Internship Applied"} />
            <ToastContainer />
            <div className="container-xxl py-5">
                {!load ? (
                    <div className="container">
                        <div className="row g-4 justify-content-center">
                            <div className="table-responsive col-md-11 shadow p-4">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Status</th>
                                           
                                            <th>Email</th>
                                       
                                            <th>Internship Title</th>
                                           
                                           
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((el, index) => (
                                            <tr key={el.id}>
                                                <td>{index + 1}</td>
                                             <td>{el.AppStatus}</td>
                                                <td>{el.email}</td>
                                             
                                                <td>{el.Interntitle}</td>
                                               
                                               
                                                <td>{new Date(el.createdAt?.seconds * 1000).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <RingLoader color="skyblue" loading={load} cssOverride={{ marginLeft: "45%" }} size={120} />
                )}
            </div>
        </>
    );
}
