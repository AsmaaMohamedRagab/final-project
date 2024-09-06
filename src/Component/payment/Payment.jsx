import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate()
    const [phone, setphone] = useState("")
    const [city, setcity] = useState("")
    const [details, setdetails] = useState("")
    const { cartid, setproduct, settotalPrice, setnumOfProduct } = useContext(cartContext)
    async function cashPayment() {
        const x = {
            shippingAddress: {
                details,
                phone,
                city,
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, x, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setnumOfProduct(0)
            settotalPrice(0)
            setproduct([])
            navigate("/allorders")
            toast.success(data.status)
        }
        catch {
            toast.error("error from cash payment")
        }
    }
    async function onlinePayment() {
        const x = {
            shippingAddress: {
                details,
                phone,
                city,
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`, x, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setnumOfProduct(0)
            settotalPrice(0)
            setproduct([])
            toast.success(data.status)
            open(data.session.url)
        }
        catch {
            toast.error("error from cash payment")
        }
    }

    return (
        <section className="py-5 bg-secondary-subtle my-5">
            <h2 className="text-success text-center mt-3">Payment</h2>
            <div className="container ">
                <div className="mb-3 mx-auto">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input type="phone" className="form-control shadow-none w-75" id="phone"
                        onChange={(e) => setphone(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City:</label>
                    <input type="text" className="form-control shadow-none w-75" id="city"
                        onChange={(e) => setcity(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Details:</label>
                    <textarea type="text" className="form-control shadow-none w-75" id="details"
                        onChange={(e) => setdetails(e.target.value)}></textarea>
                </div>
                <button onClick={cashPayment} className="btn btn-success">Cash Payment</button>
                <button onClick={onlinePayment} className="btn btn-success ms-3">Online Payment</button>
            </div>
        </section>
    )
}
