import { useEffect, useState } from "react";
import PageHeader from "../Layout/PageHeader";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../Firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function Register() {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [Password, setPassword] = useState("");
  var [contact, setcontact] = useState("");
  var [address, setaddress] = useState("");
  var [education, seteducation] = useState("");
  var [image, setimage] = useState("");
  var [load, setLoad] = useState(false);

  const nav = useNavigate();

  async function handleform(e) {
    e.preventDefault();
    setLoad(true); // Start loader

    if (!image) {
      toast.error("Please select an image");
      setLoad(false);
      return;
    }

    try {
      // 1. Upload Image to Cloudinary
      let filedata = new FormData();
      filedata.append("file", image);
      filedata.append("upload_preset", "internX");

      const imgRes = await axios.post("https://api.cloudinary.com/v1_1/dd9ipyppz/image/upload", filedata);
      const imageUrl = imgRes.data.secure_url;

      // 2. Create Firebase User
      const usercred = await createUserWithEmailAndPassword(auth, email, Password);

      // 3. Save Data to Firestore
      await saveData(usercred.user.uid, email, name, imageUrl);

      // 4. Success
      toast.success("Registered Successfully!!");
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Something went wrong");
    }

    setLoad(false); // Stop loader
  }

  const saveData = async (uid, email, name) => {
    let data = {
      name,
      contact,
      email,
      userId: uid,
      userType: 2,
      address,
      education,
      status: true,
      //image: imageUrl,
      createdAt: Timestamp.now()
    };

    await setDoc(doc(db, "users", uid), data)
      .then(() => {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("userId", uid);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userType", 2);
        nav("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((usercred) => {
        saveDatagmail(usercred.user.uid, usercred.user.email, usercred.user.displayName);
      });
  };

  const saveDatagmail = async (uid, email, name) => {
    let data = {
      name,
      contact,
      email,
      userId: uid,
      userType: 2,
      address,
      education,
      status: true,
      createdAt: Timestamp.now()
    };

    await setDoc(doc(db, "users", uid), data)
      .then(() => {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("userId", uid);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userType", 2);
        toast.success("Register Successfully")
        setTimeout(() => {
          nav("/");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <PageHeader child={"Register "} />
      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <RingLoader color="skyblue" loading={load} cssOverride={{ marginLeft: "45%" }} size={150} />
          {!load && (
            <div className="row g-4">
              <div className="offset-md-2 col-md-8 shadow p-5">
                <form onSubmit={handleform}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input required type="text" className="form-control" placeholder="Your Name"
                          value={name} onChange={(e) => { setName(e.target.value) }} />
                        <label>Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input required type="email" className="form-control" placeholder="Your Email"
                          value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label>Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input required type="password" className="form-control" placeholder="Password"
                          value={Password} onChange={(e) => { setPassword(e.target.value) }} minLength={6} />
                        <label>Password</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          required
                          type="tel"
                          className="form-control"
                          placeholder="Contact"
                          minLength={10}
                          maxLength={10}
                          value={contact}
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit contact number"
                          onChange={(e) => {
                            
                            const value = e.target.value.replace(/\D/g, "");
                            setcontact(value);
                          }}
                        />

                        <label>Contact</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input required type="text" className="form-control" placeholder="Address"
                          value={address} onChange={(e) => { setaddress(e.target.value) }} />
                        <label>Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input required type="text" className="form-control" placeholder="Education"
                          value={education} onChange={(e) => { seteducation(e.target.value) }} />
                        <label>Education</label>
                      </div>
                    </div>
                     <div className="col-md-12">
                      <div className="form-floating">
                        <input required type="file" className="form-control" onChange={(e) => { setimage(e.target.files[0]) }} />
                        <label>Image</label>
                      </div>
                    </div> 
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Register
                      </button>
                      <button type="button" className="my-3 w-100 btn btn-outline-danger py-3"
                        onClick={signUpWithGoogle}>Sign up with Google</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
