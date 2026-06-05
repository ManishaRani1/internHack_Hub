import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";


export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({
        ApplyInternShip: 0,
        hackathons: 0,
        hackathonsParticipation: 0,
        intenships: 0,
        users: 0,
    });

    // ✅ Fetch data counts
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const applyInterns = await getDocs(collection(db, "ApplyInternShip"));
                const hackathons = await getDocs(collection(db, "hackathons"));
                const participation = await getDocs(collection(db, "hackathonsParticipation"));
                const internships = await getDocs(collection(db, "intenships"));
                const users = await getDocs(collection(db, "users"));

                setCounts({
                    ApplyInternShip: applyInterns.size,
                    hackathons: hackathons.size,
                    hackathonsParticipation: participation.size,
                    intenships: internships.size,
                    users: users.size,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    return (
        <>
            <PageHeader child={"Admin Dashboard"} />
            <div className="container-xxl py-5">
                {loading ? (
                    <RingLoader color="skyblue" cssOverride={{ marginLeft: "45%" }} size={150} />
                ) : (
                    <div className="row g-4">
                        {/* Apply Internship */}
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item text-center pt-3 shadow">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-file text-primary mb-4" />
                                    <h5 className="mb-3">Apply Internship</h5>
                                    <Link to="/admin/Applications" className="nav-item nav-link">
            </Link>
                                    <p>Total Applications: {counts.ApplyInternShip}</p>
                                </div>
                            </div>
                        </div>

                        {/* Hackathons */}
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="service-item text-center pt-3 shadow">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-lightbulb text-primary mb-4" />
                                    <h5 className="mb-3">Hackathons</h5>
                                    <Link to="/admin/managehackathons" className="dropdown-item">
                  
                </Link>
                                    <p>Total Hackathons: {counts.hackathons}</p>
                                    <link></link>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Hackathon Participation */}
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item text-center pt-3 shadow">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-users text-primary mb-4" />
                                    <h5 className="mb-3">Participation</h5>
                                    <Link to="/admin/hackathonsParticipation" className="nav-item nav-link">
            </Link>
                                    <p>Total Entries: {counts.hackathonsParticipation}</p>
                                </div>
                            </div>
                        </div>

                        {/* Internships */}
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="service-item text-center pt-3 shadow">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-briefcase text-primary mb-4" />
                                    <h5 className="mb-3">Internships</h5>
                                    <Link to="/admin/manageIntership" className="dropdown-item">
                
                </Link>
                                    <p>Total Posts: {counts.intenships}</p>
                                </div>
                            </div>
                        </div>

                        {/* Users */}
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item text-center pt-3 shadow">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user text-primary mb-4" />
                                    <h5 className="mb-3">Users</h5>
                                    <Link to="/admin/manageusers" className="nav-item nav-link">
            
            </Link>
                                    <p>Registered Users: {counts.users}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
