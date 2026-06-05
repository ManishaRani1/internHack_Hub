import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import Switch from "react-switch";

export default function ManagehackaParticipation() {
    const [load, setLoad] = useState(true);
    const [allParticipation, setAllParticipation] = useState([]);

    // ✅ Fetch all hackathon participations
    useEffect(() => {
        setLoad(true);
        const unsubscribe = onSnapshot(collection(db, "hackathonsParticipation"), (snapshot) => {
            const result = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllParticipation(result);
            setLoad(false);
        });

        return () => unsubscribe();
    }, []);


    const changeStatus = async (id, currentStatus) => {
        await updateDoc(doc(db, "hackathonsParticipation", id), { status: !currentStatus })
            .then(() => toast.success("Winner Status updated"))
            .catch(() => toast.error("Failed to update status"));
    };


    const deleteParticipation = async (id) => {
        await deleteDoc(doc(db, "hackathonsParticipation", id))
            .then(() => toast.success("Participation deleted"))
            .catch((err) => toast.error(err.message));
    };

    return (
        <>
            <PageHeader child={"Manage All Hackathon Participations"} />
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
                                            <th>Winners</th>
                                            <th>Delete</th>
                                            <th>Title</th>
                                            <th>User Email</th>
                                            <th>Description</th>
                                            <th>Mode</th>
                                            <th>Schedule</th>
                                            <th>Location</th>
                                            <th>Scholarship</th>
                                            <th>Attachment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allParticipation.length > 0 ? (
                                            allParticipation.map((el, index) => (
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
                                                        <button
                                                            className="btn btn-danger btn-sm rounded-pill"
                                                            onClick={() => deleteParticipation(el.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    <td>{el.title}</td>
                                                    <td>{el.email}</td>
                                                    <td>{el.description}</td>
                                                    <td>{el.mode}</td>
                                                    <td>{el.schedule}</td>
                                                    <td>{el.location}</td>
                                                    <td>{el.scholarship}</td>
                                                    <td>
                                                        {el.attachment ? (
                                                            <a
                                                                href={el.attachment}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-info btn-sm"
                                                            >
                                                                View File
                                                            </a>
                                                        ) : (
                                                            "No file"
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" className="text-center text-muted">
                                                    No participations found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <RingLoader color="skyblue" loading={load} cssOverride={{ marginLeft: "45%" }} size={150} />
                )}
            </div>
        </>
    );
}
