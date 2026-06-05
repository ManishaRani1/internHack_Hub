import { Link } from "react-router-dom";

export default function Home(){
    return(
       <>
  {/* Carousel Start */}
  <div className="container-fluid p-0 mb-5">
    <div className="owl-carousel header-carousel position-relative">
      <div className="owl-carousel-item position-relative">
        <img className="img-fluid" src="/assets/img/carousel-1.jpg" alt="" />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          style={{ background: "rgba(24, 29, 56, .7)" }}
        >
          <div className="container-fluid">
            <div className="row justify-content-start">
              <div className="col-sm-10 col-lg-8">
                <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                  Best Online Courses
                </h5>
                <h1 className="display-3 text-white animated slideInDown">
                  The Best Online Platform
                </h1>
                <p className="fs-5 text-white mb-4 pb-2">
                  Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                  no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                  sanctus eirmod elitr.
                </p>
                <a
                  href=""
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Read More
                </a>
                <a
                  href=""
                  className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="owl-carousel-item position-relative">
        <img className="img-fluid" src="/assets/img/carousel-2.jpg" alt="" />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          style={{ background: "rgba(24, 29, 56, .7)" }}
        >
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-sm-10 col-lg-8">
                <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                  Best Online Internships
                </h5>
                <h1 className="display-3 text-white animated slideInDown">
                  Get Educated Online From Your Home
                </h1>
                <p className="fs-5 text-white mb-4 pb-2">
                  Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                  no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                  sanctus eirmod elitr.
                </p>
                <a
                  href=""
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Read More
                </a>
                <a
                  href=""
                  className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Carousel End */}
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-4 ">
        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-graduation-cap text-primary mb-4" />
                    <Link to={"/internship"}><h5 className="mb-3">Internships </h5></Link>
              <p>
                      Interns can browse and apply for various internships, upload resumes, and track their application status easily. This service connects interns with verified companies offering real-world work opportunities.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-globe text-primary mb-4" />
                    <Link to={"/hackathons"}><h5 className="mb-3"> Hackathons</h5></Link>
              <p>
                    Discover exciting hackathons and stay updated with upcoming events.
Collaborate with creative minds and build innovative solutions.
Enhance your skills through real-world challenges.
Gain experience and confidence.

              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-globe text-primary mb-4" />
                    <Link to={"/myhackathons"}><h5 className="mb-3"> Hackathon Participation</h5></Link>
              <p>
                      Interns can discover and participate in exciting hackathons, submit their projects online, and compete for rewards while improving their skills and building strong team collaboration experience.


              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-home text-primary mb-4" />
                    <Link to={"/contact"}><h5 className="mb-3"> Learning & Skill Development</h5></Link>
              <p>
                      Learn and grow through real internship and hackathon experiences.
                      Gain practical skills by working on real-world problems.
Build confidence by participating in challenges and projects.

              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  {/* Service End */}
  {/* About Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div
          className="col-lg-6 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ minHeight: 400 }}
        >
          <div className="position-relative h-100">
            <img
              className="img-fluid position-absolute w-100 h-100"
              src="/assets/img/about.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
          <h6 className="section-title bg-white text-start text-primary pe-3">
            About Us
          </h6>
                <h1 className="mb-4">Welcome to Our Website</h1>
          <p className="mb-4">
                  We are a platform built to help students and learners bridge the gap between education and real-world experience. Our goal is to provide easy access to internships and hackathons where users can learn practical skills, work on real projects, and explore new opportunities. Through this platform, users can track their skill growth, participate in challenges, and showcase their abilities in a meaningful way. We believe that learning becomes more powerful when it is applied, so we focus on creating opportunities that not only improve knowledge but also build confidence and career readiness.
          </p>
          <p className="mb-4">
                  This platform helps students explore internships, hackathons, and learning opportunities while also providing tools like resume building and applications. It is designed to connect learning with real-world experience, helping users improve their skills, apply for opportunities, and build a strong career profile.
                  </p>
          <div className="row gy-2 gx-4 mb-4">
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                      Internship Lists
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                      Hackathon Participation
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                      Easy Application
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                      User Dashboard
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                      Learning & Skill Development
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                      Progress Tracking


              </p>
            </div>
          </div>
                <Link to="/internship" className="btn btn-primary py-3 px-5 mt-2" href="">
            Read More
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
 
</>

    )
}