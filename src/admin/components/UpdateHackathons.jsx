import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function UpdateHackathon() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mode, setMode] = useState("");
    const [schedule, setSchedule] = useState("");
    const [location, setLocation] = useState("");
    const [scholarship, setScholarship] = useState("");
    const [load, setLoad] = useState(false);

    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        onSnapshot(doc(db, "hackathons", id), (snapshot) => {
            const data = snapshot.data();
            if (data) {
                setTitle(data.title || "");
                setDescription(data.description || "");
                setMode(data.mode || "");
                setSchedule(data.schedule || "");
                setLocation(data.location || "");
                setScholarship(data.scholarship || "");
            }
        });
    }, [id]);

    const handleForm = async (e) => {
        e.preventDefault();
        setLoad(true);

        const updatedData = {
            title,
            description,
            mode,
            schedule,
            location,
            scholarship,
            status: true,
            createdAt: Timestamp.now()
        };

        await updateDoc(doc(db, "hackathons", id), updatedData)
            .then(() => {
                toast.success("Hackathon updated successfully!");
                setTimeout(() => {
                    setLoad(false);

                    nav("/admin/managehackathons");
                }, 1500);
            })
            .catch((err) => {
                toast.error(err.message);
            });

    };

    return (
        <>
        <ToastContainer/>
            <PageHeader child={"Update Hackathon"} />
            <div className="container-xxl py-5">
                    <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%" }} size={150} />
                {!load && (
                    <div className="container">
                        <div className="row g-4 justify-content-center">
                            <div className=" col-md-8 shadow p-5">
                                <form onSubmit={handleForm}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                                <label>Title</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select
                                                    value={mode}
                                                    required
                                                    onChange={(e) => setMode(e.target.value)}
                                                    className="form-control"
                                                >
                                                    <option disabled>Select Mode</option>
                                                    <option value="Online">Online</option>
                                                    <option value="Offline">Offline</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                </select>
                                                <label>Mode</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    required
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={schedule}
                                                    onChange={(e) => setSchedule(e.target.value)}
                                                    min={new Date().toISOString().slice(0, 16)}
                                                />
                                                <label>Schedule</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Location"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                />
                                                <label>Location</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <textarea
                                                    required
                                                    className="form-control"
                                                    placeholder="Description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                                <label>Description</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Scholarship"
                                                    value={scholarship}
                                                    onChange={(e) => setScholarship(e.target.value)}
                                                />
                                                <label>Scholarship</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Update Hackathon
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
