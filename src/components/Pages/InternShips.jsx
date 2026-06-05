
import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader";
import { RingLoader } from "react-spinners";
import { collection, doc, onSnapshot, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "../../Firebase";
import { col } from "motion/react-m";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Interships(){


        const [load, setLoad] = useState(false);
        const [AllInterships, setAllInterships] = useState([])
        const [AppliedInternShips, setAppliedInternShips] = useState([])
     const [category, setcategory] = useState("all")
    const email=sessionStorage.getItem("email")
    const nav=useNavigate()

        useEffect(()=>{

            if (sessionStorage.getItem("isLogin") == null) {
                toast.warning("Please Login First")
                setTimeout(() => {
                    nav("/login")
                }, 1500);
            }
            if (category == "all"  ){
                console.log("if");
                setLoad(true)
               onSnapshot(collection(db, "intenships"), (Intershipdata) => {
                   setAllInterships(
                       Intershipdata.docs.map((el) => {
                           return { id: el.id, ...el.data() }
                       })
                   )

                   setLoad(false)
               })
           }
           else{
                setLoad(true)
               onSnapshot(query(collection(db, "intenships"), where("category", "==", category)), (Intershipdata) => {
                   setAllInterships(
                       Intershipdata.docs.map((el) => {
                           return { id: el.id, ...el.data() }
                       })
                   )
                   console.log("Hloo");

                   setLoad(false)
               })
           }

            onSnapshot(query(collection(db, "ApplyInternShip"),where("email","==",email)),(AppliedIntern)=>{
                setAppliedInternShips(
                    AppliedIntern.docs.map((el)=>{
                        return {id:el.id, ...el.data()}
                    })
                )
                
            })

        },[category])

   const ApplyInternship=async(id,interName)=>{

    setLoad(true)
    // console.log(id);
    const existID = id + email
    console.log(existID);
    const data={
        userId:sessionStorage.getItem("userId"),
        email:email,
        internShipId:id,
        Interntitle:interName,
        AppStatus:"Applied",
        status:true,
        createdAt: Timestamp.now()
        
    }
    
    await setDoc(doc(db,"ApplyInternShip",existID),data).then((SavedApply)=>{
        console.log(SavedApply);
        toast.success("InternShip Applied")
        
    }).catch((err)=>{
        toast.error(err.message)
    })
    
    setLoad(false)
    
    }
    
    
    return(
      <>
      <ToastContainer/>
      <PageHeader child={"Internships"}/>

      {
        !load?
                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="section-title bg-white text-center text-primary px-3">
                                    Internships
                                </h6>
                                <h1 className="mb-5">Our Internships</h1>
                                <div className="input-group mb-3">
                                    <select
                                        value={category}
                                        required
                                        onChange={(e) => setcategory(e.target.value)}
                                        className="form-control rounded-pill px-4 py-2 shadow-sm border border-secondary"
                                        style={{ maxWidth: "350px" }}
                                    >
                                        <option value="all"  selected >
                                            🔍All Select Category
                                        </option>
                                        <option value="paid">💰 Paid</option>
                                        <option value="unpaid">🙅 Unpaid</option>
                                        <option value="fulltime">🕐 Full-Time</option>
                                        <option value="halftime">⏳ Half-Time</option>
                                    </select>

                                </div>

                            </div>
                            <div className="row g-4 mt-4 justify-content-center">

                                {
                                    AllInterships.map((el)=>{
                                       if(el.status==true){
                                           return <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                               <div className="course-item bg-light">
                                                   <div className="position-relative overflow-hidden">
                                                       <img width={500} 
                                                           style={{ height: 250, objectFit: "cover" }}
                                                       height={250} className="img-fluid" src={el.image} alt="" />
                                                       <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">

                                                           {
                                                               AppliedInternShips.some(e => e.internShipId == el.id) ?
                                                                   (<button

                                                                       className="flex-shrink-0 btn btn-sm btn-primary px-3"
                                                                       style={{ borderRadius: "30px 30px 30px 30px" }}
                                                                   >
                                                                       Already Applied
                                                                   </button>)
                                                                   :
                                                                   (<button
                                                                       onClick={() => {
                                                                           ApplyInternship(el.id, el.title)
                                                                       }}
                                                                       className="flex-shrink-0 btn btn-sm btn-primary px-3"
                                                                       style={{ borderRadius: "30px 30px 30px 30px" }}
                                                                   >
                                                                       Apply
                                                                   </button>)
                                                           }
                                                       </div>
                                                   </div>
                                                   <div className="text-center p-4 pb-0">
                                                       <h3 className="mb-0">{el.title}</h3>
                                                       <div className="mb-3">
                                                           <small>{el.duration}</small>
                                                       </div>
                                                       <h5 className="mb-4">
                                                           {el.location}
                                                       </h5>
                                                   </div>
                                                   <div className="d-flex border-top">
                                                       <small className="flex-fill text-center border-end py-2">
                                                           <i className="fa fa-user-tie text-primary me-2" />
                                                           {el.company}
                                                       </small>
                                                       <small className="flex-fill text-center border-end py-2">
                                                           <i className="fa fa-clock text-primary me-2" />
                                                           {el.eligibility}
                                                       </small>
                                                       <small className="flex-fill text-center py-2">
                                                           <i className="fa fa-user text-primary me-2" />
                                                           {el.category}
                                                       </small>
                                                   </div>
                                               </div>
                                           </div>
                                       }
                                    })
                                }
                              




                            </div>
                        </div>
                    </div>
        :
                    <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%" }} size={150} />


      }
            
</>

    )
}