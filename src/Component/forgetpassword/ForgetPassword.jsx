import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
const ForgetPassword = () => {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const user = {
    mail: ""
  }
  async function forgetPassword(mail) {
    try {
      setloading(true)
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: mail })
      console.log(data);
      setloading(false)
      toast.success(data.message)
      navigate("/resetcode")
    }
    catch (err) {
      setloading(false)
      toast.error(err.response.data.message)
    }
  }
  return (
    <>
      {loading ? <div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div> :
        <div className="container py-5">
          <h2>please enter your Email</h2>
          <input type="email" className='w-100 d-block my-3 py-3 rounded-2 border-1 border ps-3' placeholder='Email' id='mail' />
          <button type='submit' onClick={()=>forgetPassword(document.querySelector("#mail").value)} className='border-1 border-success border-bottom border-end px-3 py-2 rounded-2 text-success'>verify</button>
        </div>}
    </>

  )
}

export default ForgetPassword