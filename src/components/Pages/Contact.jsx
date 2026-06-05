import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../Firebase";
import { RingLoader } from "react-spinners";
import PageHeader from "../../Layout/PageHeader";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


   
    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading(true);
        const data = {
            name,
            email,
            subject,
            message,
            timestamp:  Timestamp.now()
}

        try {
            await addDoc(collection(db, "contacts"),data);
            toast.success("Message sent successfully!");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            toast.error("Failed to send message, try again!");
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <>
            <ToastContainer />
            <PageHeader child={"Contact"}/>
            {
                loading?
                    <RingLoader color="" loading={loading} cssOverride={{ marginLeft: "45%", color: "skyblue" }} size={150} />
:
                <>
                       

                        {/* Contact Start */}
                        <div className="container-xxl py-5">
                            <div className="container">
                                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <h6 className="section-title bg-white text-center text-primary px-3">
                                        Contact Us
                                    </h6>
                                    <h1 className="mb-5">Contact For Any Query</h1>
                                </div>
                                <div className="row g-4 justify-content-center">
                                    <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            required
                                                            type="text"
                                                            className="form-control"
                                                            id="name"
                                                            placeholder="Your Name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        <label htmlFor="name">Your Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            required
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            placeholder="Your Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <label htmlFor="email">Your Email</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating">
                                                        <input
                                                            required
                                                            type="text"
                                                            className="form-control"
                                                            id="subject"
                                                            placeholder="Subject"
                                                            value={subject}
                                                            onChange={(e) => setSubject(e.target.value)}
                                                        />
                                                        <label htmlFor="subject">Subject</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating">
                                                        <textarea
                                                            className="form-control"
                                                            required
                                                            placeholder="Leave a message here"
                                                            id="message"
                                                            style={{ height: 150 }}
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                        />
                                                        <label htmlFor="message">Message</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100 py-3" type="submit" disabled={loading}>
                                                        {loading ? "Sending..." : "Send Message"}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Contact End */}

                        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                            <i className="bi bi-arrow-up" />
                        </a>
                
                </>
            }
           
        </>
    );
}

export default Contact;
