import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import PageHeader from "../../Layout/PageHeader";

export default function ManageContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch contacts in real-time
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "contacts"), (snapshot) => {
            const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setContacts(list);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    // Delete contact
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.success("Message deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete message");
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <PageHeader child={"Manage Contacts"} />

            {loading ? (
                <RingLoader color="skyblue" loading={loading} cssOverride={{ marginLeft: "45%" }} size={150} />
            ) : (
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="table-responsive shadow p-3 rounded">
                            <table className="table table-bordered table-striped">
                                <thead className="table-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.length > 0 ? (
                                        contacts.map((c, index) => (
                                            <tr key={c.id}>
                                                <td>{index + 1}</td>
                                                <td>{c.name}</td>
                                                <td>{c.email}</td>
                                                <td>{c.subject}</td>
                                                <td>{c.message}</td>
                                                <td>{c.timestamp?.toDate?.().toLocaleString() || "N/A"}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(c.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                No messages found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
