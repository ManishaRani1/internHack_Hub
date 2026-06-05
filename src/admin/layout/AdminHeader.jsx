import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminHeader() {
  const isLogin = sessionStorage.getItem("isLogin")
  const nav = useNavigate()

  const logout = () => {
    Swal.fire({
      title: "Did you want to logout?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout!",
          // text: "Your file has been deleted.",
          icon: "success"
        });
        sessionStorage.clear()
        nav("/login")
        window.location.reload();
      }
    
    });
   
  }
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to='/admin'
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3" />
            Admin
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
            {/* <a href="index.html" className="nav-item nav-link active">
          Inter
        </a>
        <a href="about.html" className="nav-item nav-link">
          About
        </a>
        <a href="courses.html" className="nav-item nav-link">
          Courses
        </a> */}
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Internship
              </Link>
              <div className="dropdown-menu fade-down m-0">
                <Link to="/admin/addinternship" className="dropdown-item">
                  Add
                </Link>
                <Link to="/admin/manageIntership" className="dropdown-item">
                  Manage
                </Link>

              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Hackathons
              </Link>
              <div className="dropdown-menu fade-down m-0">
                <Link to="/admin/addhackathons" className="dropdown-item">
                  Add
                </Link>
                <Link to="/admin/managehackathons" className="dropdown-item">
                  Manage
                </Link>

              </div>
            </div>
            <Link to="/admin/Applications" className="nav-item nav-link">
              Applications
            </Link>
            <Link to="/admin/hackathonsParticipation" className="nav-item nav-link">
               Hackathons Apps
            </Link>
            <Link to="/admin/manageusers" className="nav-item nav-link">
              Manage Users
            </Link>
            <Link to="/admin/manageContact" className="nav-item nav-link">
              Manage Contact
            </Link>
            {/* <a href="contact.html" className="nav-item nav-link">
              Contact
            </a> */}
          </div>
          {
            isLogin == "true" ?
                          (

                <button onClick={logout} button className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                  Logout
                  <i className="fa fa-arrow-right ms-3" />
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                  Login
                  <i className="fa fa-arrow-right ms-3" />
                </Link>
              )
          }
        </div>
      </nav>
      {/* Navbar End */}
    </>
  )
}