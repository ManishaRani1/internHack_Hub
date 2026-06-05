import { useEffect, useState } from "react";
import PageHeader from "../../Layout/PageHeader"
import { auth, db } from "../../Firebase"
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { collection, deleteDoc, doc, getDocs, onSnapshot, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { RingLoader } from "react-spinners";
import Switch from "react-switch";

export default function ManageIntership() {
  var [data, setData] = useState([]);
  var [load, setLoad] = useState(true);
  const [AllinternShips, setAllinternShips] = useState([])

  useEffect(() => {
    const fetchdata = () => {
      // setLoad(true)
      onSnapshot(collection(db, "intenships"), (InternShipDairy) => {
        setAllinternShips(InternShipDairy.docs.map((el) => {
          return { id: el.id, ...el.data() }
        }));
        setLoad(false)
      })

      
      // console.log("Data",setAllinternShips);
      
      
    }
    
    fetchdata()
  }, [])

  const changeStatus = async (id, CurrentStatus) => {
    // console.log(id,CurrentStatus);
    
    await updateDoc(doc(db, "intenships", id), { status: CurrentStatus }).then(() => {
      toast.success("status Updated")
    }).catch(() => {

      toast.error("Fail to  Updated status")
    })

  }

  const DeleteInterShip=async(id)=>{
    await deleteDoc(doc(db,"intenships",id)).then(()=>{
      toast.success("InternShip deleted")
      console.log("InternShip deleted")
    }).catch((err)=>{
      
      toast.error(err.message)
    })
  }






  return (
    <>
    <ToastContainer/>
      <PageHeader child={"Manage Internship"} />
      {/* Service Start */}
      <div className="container-xxl py-5">

        {load ?

          <RingLoader color="" loading={load} cssOverride={{ marginLeft: "45%", color: "skyblue" }} size={150} />
            : 
            <div className="container">
              <div className="row g-4 justify-content-center">
                <div className="table-responsive col-md-10 shadow p-5">
                  <table className=" table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Srno</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Company</th>
                        <th>Deadline</th>
                        <th>Contact</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Eligibility</th>
                        <th>Location</th>

                      </tr>
                    </thead>
                    <tbody>

                      {
                        AllinternShips.map((el, index) => {
                          return <tr>
                            <td>{index + 1}</td>
                            <td>
                              <Switch
                                className="react-switch"
                                onChange={() => { changeStatus(el.id, !el.status) }}
                                checked={el.status}
                                aria-labelledby="neat-label"
                              />

                            </td>
                            <td><Link to={`/admin/UpdateInternship/${el.id}`} className="btn btn-success rounded-pill">Update</Link></td>
                            <td><button className="btn btn-danger rounded-pill" onClick={()=>{
                              DeleteInterShip(el.id)
                            }}>Delete</button></td>
                            <td>{el.category}</td>
                            <td>{el.title}</td>
                            <td><img src={el.image} width={70} alt="" /></td>
                            <td>{el.company}</td>
                            <td>{el.deadline}</td>
                            <td>{el.contactdetails}</td>
                            <td>{el.description}</td>
                            <td>{el.duration}</td>
                            <td>{el.eligibility}</td>
                            <td>{el.location}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>

                </div>
              </div>
            </div>

            }
      </div>
    </>

  )
}