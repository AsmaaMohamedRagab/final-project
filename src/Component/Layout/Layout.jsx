import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.jsx"
export default function Layout (){
    return (
        <>
        <Navbar />
        <Outlet />
        <div className="footer bg-body-secondary pb-5" >
            <h3 className="pt-2 ps-4">Get the FreshCart app</h3>
            <p className="pt-2 ps-4">We will send you a link, open it on your phone to download the app</p>
            <div className="d-flex justify-content-evenly mx-2">
                <input type="email" className="form-control w-75 " placeholder="Email.."/>
                <button className="btn btn-success text-white">Share App Link</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mx-5 mt-3 py-3 border-bottom border-top">
                <div className="payment d-flex">
                    <p className="me-2 ms-3">Payment Parteners</p>
                    <i className="fa-brands fa-aws me-2 mt-1"></i>
                    <i className="fa-brands fa-cc-mastercard me-2 mt-1"></i>
                    <i className="fa-brands fa-cc-paypal me-2 mt-1"></i>
                </div>
                <div className="app">
                    <p>Get Deliveries with FreshCart</p>
                </div>

            </div>
        </div>
        </>
    )
}