import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Resetcode = () => {
    const [loader, setloader] = useState(false)
    const navigate=useNavigate()
  async function resetcode(code) {
    try {
        setloader(true)
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: code })
      console.log(data);
      setloader(false)
      toast.success(data.status)
      navigate("/resetpassword")
    }
    catch (err) {
        setloader(false)
      toast.error(err.response.data.message)
    }
  }
  return (
    <>
    {loader?<div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>:
      <div className="container py-5">
        <h2>reset your account password</h2>
        <input type="email" className='w-100 d-block my-3 py-3 rounded-2 border-1 border ps-3' placeholder='Code' />
        <button onClick={() => resetcode(document.querySelector("input").value)} className='border-1 border-success border-bottom border-end px-3 py-2 rounded-2 text-success'>verify</button>
      </div>}
    </>

  )
}

export default Resetcode