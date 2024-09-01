import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Resetpassword = () => {
    const [load, setload] = useState(false)
    const navigate = useNavigate()
    async function resetpassword(mail,password) {
        try {
            setload(true)
            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                {
                    email:mail,
                    newPassword:password,
                })
            console.log(data);
            setload(false)
            toast.success("success")
            navigate("/")
        }
        catch (err) {
            setload(false)
            toast.error(err.response.data.message)
        }
    }
    return (
        <>
        {load?<div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>:
            <div className="container py-5">
                <h2>reset your account password</h2>
                <input type="email" className='w-100 d-block my-3 py-3 rounded-2 border-1 border ps-3' placeholder='Email' id='mail' />
                <input type="password" className='w-100 d-block my-3 py-3 rounded-2 border-1 border ps-3' placeholder='Password' id='password' />
                <button onClick={() => resetpassword(document.querySelector("#mail").value,document.querySelector("#password").value)} className='border-1 border-success border-bottom border-end px-3 py-2 rounded-2 text-success'>verify</button>
            </div>}
        </>

    )
}

export default Resetpassword