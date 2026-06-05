import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import Switch from "react-switch";

export default function ManageHackathon() {
    const [load, setLoad] = useState(true);
    const [allHackathons, setAllHackathons] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            setLoad(true);
            onSnapshot(collection(db, "hackathons"), (snapshot) => {
                const result = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllHackathons(result);
                setLoad(false);
            });
        };

        fetchData();
    }, []);

    const changeStatus = async (id, currentStatus) => {
        await updateDoc(doc(db, "hackathons", id), { status: !currentStatus })
            .then(() => toast.success("Status updated"))
            .catch(() => toast.error("Failed to update status"));
    };

    const deleteHackathon = async (id) => {
        await deleteDoc(doc(db, "hackathons", id))
            .then(() => toast.success("Hackathon deleted"))
            .catch((err) => toast.error(err.message));
    };

    return (
        <>
            <PageHeader child={"Manage Hackathons"} />
            <ToastContainer />
            <div className="container-xxl py-5">
                {!load ? (
                    <div className="container">
                        <div className="row g-4 justify-content-center">
                            <div className="table-responsive col-md-10 shadow p-5">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Status</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Mode</th>
                                            <th>Schedule</th>
                                            <th>Location</th>
                                            <th>Scholarship</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allHackathons.map((el, index) => (
                                            <tr key={el.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Switch
                                                        onChange={() => changeStatus(el.id, el.status)}
                                                        checked={el.status}
                                                        className="react-switch"
                                                    />
                                                </td>
                                                <td>
                                                    <Link to={`/admin/UpdateHackathon/${el.id}`} className="btn btn-success rounded-pill">
                                                        Update
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger rounded-pill"
                                                        onClick={() => deleteHackathon(el.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td>{el.title}</td>
                                                <td>{el.description}</td>
                                                <td>{el.mode}</td>
                                                <td>{el.schedule}</td>
                                                <td>{el.location}</td>
                                                <td>{el.scholarship}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%", color: "skyblue" }} size={150} />
                )}
            </div>
        </>
    );
}
