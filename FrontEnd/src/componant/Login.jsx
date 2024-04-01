import React, { useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login=()=>{
    // hookes
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [show,setShow]=useState(false);
    const [loading,setLoading]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");

    const navigate=useNavigate();

    // functions
    const handleClick=()=>{
        setShow(!show);
    }
    const submitHandler=async (event)=>{
      event.preventDefault();
      setLoading(true);

      try {
        const {data}= await axios.post("http://localhost:5000/api/users/login",{email,password})
        setEmail("");
        setPassword("");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate('/chats');
      } catch (error) {
        setErrorMessage("Some thing want Wrong");
      }finally{
        setLoading(false);
      }
    }

    return(
        <>
            <form onSubmit={submitHandler}>
                {errorMessage && (<p className=" text-bg-light text-warning text-center fs-4">{errorMessage}</p>)}
                 <div className="mb-1">
                   <label className="form-label">Email <span className=" text-danger fw-bolder fs-6">*</span></label>
                   <input type="email" className="form-control py-0"
                        placeholder="Enter Your Email"
                        name="email"
                        value={email}
                        onChange={(event)=>{
                          setEmail(event.target.value);
                        }}
                   />
                 </div>
                 <div className="mb-1">
                   <label className="form-label">Password <span className=" text-danger fw-bolder fs-6">*</span></label>
                   <input type={show ? "text" : "password"} className="form-control py-0" 
                        placeholder="Enter Your Password"
                        name="password"
                        value={password}
                        onChange={(event)=>{
                          setPassword(event.target.value);
                        }}
                   />
                   {show ? <VisibilityOffIcon onClick={()=>{setShow(!show)}}/> :<RemoveRedEyeIcon onClick={()=>{setShow(!show)}}/>  }
                 </div>
                 <button type="submit" className="btn btn-primary">{loading ? "Loading..." : "Login"}</button>
            </form>
        </>
    )
}

export default Login