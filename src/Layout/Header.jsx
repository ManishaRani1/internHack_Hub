import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header() {
  const isLogin = sessionStorage.getItem("isLogin");
  const nav = useNavigate();

  useEffect(() => {
    // optional
  }, []);

  const logout = () => {
    Swal.fire({
      title: "Did you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout!",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        }).then(() => {
          sessionStorage.clear();
          nav("/login");
        });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 w-100">
      
      <div className="container-fluid">  {/* 🔥 IMPORTANT FIX */}

        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3" />
            InternHack_Hub
          </h2>
        </Link>

        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            <Link to="/internship" className="nav-item nav-link">Internship</Link>
            <Link to="/viewinternship" className="nav-item nav-link">View Internship</Link>
            <Link to="/hackathons" className="nav-item nav-link">View Hackathons</Link>
            <Link to="/myhackathons" className="nav-item nav-link">My Hackathons</Link>
            
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>

          {
            isLogin === "true" ? (
              <button
                onClick={logout}
                className="btn btn-primary py-3 px-lg-4 me-3"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary py-3 px-lg-4 me-3"
              >
                Login
              </Link>
            )
          }
        </div>

      </div>
    </nav>
  );
}