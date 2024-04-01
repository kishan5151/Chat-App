import React, { useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

const Registration=()=>{

  const[show,setShow]=useState(false);
  const[userName,setUserName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[mobile,setMobile]=useState("");
  const[pic,setPic]=useState(null);
  const[isRegister,setIsRegister]=useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const[isLoading,setIsLoading]=useState(false);

 const handleFileChange = (event) => {
    setPic(event.target.files[0]);
  };

  const handleSubmit=async (event)=>{
      event.preventDefault();
      setIsLoading(true);
      
      const formData=new FormData();
      formData.append('userName',userName);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('mobile',mobile);
      formData.append('pic',pic);
      
      try {
        const response= await axios.post("http://localhost:5000/api/users/register",formData,{
          headers:{
            "Content-Type" : 'multipart/form-data'
          }
        })
        setIsRegister(true);
        setErrorMessage(false);
        setUserName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setPic(null);
        console.log('Registration Successful : ',response.data);
      } catch (error) {
        console.log('Registration error :',error);
        setErrorMessage('An error occurred. Please try again later.');
        setIsRegister(false);
        setUserName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setPic(null);
      }finally{
          setIsLoading(false);
      }
  }

  return(
    <>
      {isRegister && (<p className=" text-bg-success text-white text-center fs-4">Register Sucessfully</p>)}
      {errorMessage && <p className="error-message text-bg-danger text-white text-center fs-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
           <div className="mb-1">
             <label className="form-label">UserName <span className=" text-danger fw-bolder fs-6">*</span></label>
             <input type="text" className="form-control py-0"
                  placeholder="Enter Your UserName"
                  name="username"
                  value={userName}
                  onChange={(event)=>{
                    setUserName(event.target.value);
                  }}  
             />
           </div>     
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
             <input type={show ? "text" : "password"} className="form-control py-0" aria-describedby="emailHelp"
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
                  onChange={(event)=>{
                    setPassword(event.target.value);
                  }}
             />
             {show ? <VisibilityOffIcon onClick={()=>{setShow(!show)}}/> :<RemoveRedEyeIcon onClick={()=>{setShow(!show)}}/>  }
           </div>

           <div className="mb-1">
             <label className="form-label">Mobile No. <span className=" text-danger fw-bolder fs-6">*</span></label>
             <input type="text" className="form-control py-0"
                  placeholder="Enter Your Mobile No."
                  value={mobile}
                  name="mobile"
                  onChange={(event)=>{
                    setMobile(event.target.value);
                  }}
             />
           </div>
            <div className="mb-1">
             <label className="form-label">Pic <span className=" text-danger fw-bolder fs-6">*</span></label>
             <input type="file" className="form-control py-0"
              name="pic"
              onChange={handleFileChange}
             />
           </div>
           <br/>
           <div className=" text-center">
            <button type="submit" className="btn btn-primary">{isLoading ? "Loading..." : "Register"}</button>
           </div>
      </form>
    </>
  )
}

export default Registration;