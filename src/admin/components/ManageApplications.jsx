import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import Switch from "react-switch";
import Swal from "sweetalert2";

export default function ManageApplications() {
    const [load, setLoad] = useState(true);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            setLoad(true);
            onSnapshot(collection(db, "ApplyInternShip"), (snapshot) => {
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

    const changeStatus = async (id, currentStatus) => {
        await updateDoc(doc(db, "ApplyInternShip", id), { status: !currentStatus })
            .then(() => toast.success("Status updated"))
            .catch(() => toast.error("Failed to update status"));
    };

    const deleteApplication = async (id) => {
        await deleteDoc(doc(db, "ApplyInternShip", id))
            .then(() => toast.success("Application deleted"))
            .catch((err) => toast.error(err.message));
    };

    const changeAppStatus=async(id,status)=>{
        console.log(id,status);
        if (status =="Applied"){
          await updateDoc(doc(db, "ApplyInternShip", id), { AppStatus: "Short-Listed" })
              .then(() => toast.success("Status updated"))
              .catch(() => toast.error("Failed to update status"));
      }
        else if (status =="Short-Listed"){
            await updateDoc(doc(db, "ApplyInternShip", id), { AppStatus: "Selected" })
                .then(() => toast.success("Status updated"))
                .catch(() => toast.error("Failed to update status"));
      }
      else{
        toast.error("Appication status not updated")
      }
        
    }

    const AppReject =  (id) => {
        
        Swal.fire({
            title: "Do you want to reject the Application?",
            text: "Once you reject the request your are not able to approve it again!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Rejected!",
                    // text: ".",
                    icon: "success"
                });
                await updateDoc(doc(db, "ApplyInternShip", id), { AppStatus: "Rejected" })
                    .then(() => toast.success("Status updated"))
                    .catch(() => toast.error("Failed to update status"));
            }
        });

           
        
       

    }

    return (
        <>
            <PageHeader child={"Manage Internship Applications"} />
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
                                            <th>Update</th>
                                            <th>Reject</th>
                                            <th>Delete</th>
                                            <th>Email</th>
                                       
                                            <th>Internship Title</th>
                                           
                                           
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((el, index) => (
                                            <tr key={el.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Switch
                                                        onChange={() => changeStatus(el.id, el.status)}
                                                        checked={el.status}
                                                    />
                                                </td>
                                                <td>
                                                    {/* No edit page, so we just toggle status */}
                                                    <button
                                                        onClick={() => changeAppStatus(el.id, el.AppStatus)}
                                                        className="btn btn-success rounded-pill"
                                                    >
                                                        {el.AppStatus}
                                                    </button>
                                                </td>
                                                <td>
                                                    {/* No edit page, so we just toggle status */}
                                                    {
                                                        el.AppStatus=="Rejected"?
                                                        "Rejected"
                                                        :
                                                            <button
                                                                onClick={() => AppReject(el.id)}
                                                                className="btn btn-primary rounded-pill"
                                                            >
                                                                Reject
                                                            </button>
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => deleteApplication(el.id)}
                                                        className="btn btn-danger rounded-pill"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
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
