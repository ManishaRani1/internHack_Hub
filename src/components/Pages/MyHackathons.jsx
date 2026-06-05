import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function UserHackathonParticipation() {
    const [load, setLoad] = useState(true);
    const [userParticipation, setUserParticipation] = useState([]);
    const nav=useNavigate()

    const userId = sessionStorage.getItem("userId");

    // ✅ Fetch only the logged-in user's participations
    useEffect(() => {
       

        if (sessionStorage.getItem("isLogin") == null) {
            toast.warning("Please Login First")
            setTimeout(() => {
                nav("/login")
            }, 1500);
        }

        setLoad(true);

        // Firestore query to fetch only current user's participations
        const q = query(collection(db, "hackathonsParticipation"), where("userId", "==", userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const result = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserParticipation(result);
            setLoad(false);
        });

        return () => unsubscribe();
    }, [userId]);

    // ✅ Delete user's participation
    const deleteParticipation = async (id) => {
        await deleteDoc(doc(db, "hackathonsParticipation", id))
            .then(() => toast.success("Participation deleted"))
            .catch((err) => toast.error(err.message));
    };

    return (
        <>
            <PageHeader child={"My Hackathon Participations"} />
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
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Mode</th>
                                            <th>Schedule</th>
                                            <th>Location</th>
                                            <th>Scholarship</th>
                                            <th>Winner</th>
                                            <th>Attachment</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userParticipation.length > 0 ? (
                                            userParticipation.map((el, index) => (
                                                <tr key={el.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{el.title}</td>
                                                    <td>{el.description}</td>
                                                    <td>{el.mode}</td>
                                                    <td>{el.schedule}</td>
                                                    <td>{el.location}</td>
                                                    <td>{el.scholarship}</td>
                                                    <td>
                                                        {el.status ? (
                                                            <span className="badge bg-success">Winner</span>
                                                        ) : (
                                                            <span className="badge bg-secondary">Pending</span>
                                                        )}
                                                    </td>
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
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm rounded-pill"
                                                            onClick={() => deleteParticipation(el.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center text-muted">
                                                    You have not participated in any hackathon yet.
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
