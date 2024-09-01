import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react";

export default function Allorders() {
    const { id } = jwtDecode(localStorage.getItem("tkn"))
    const [load, setload] = useState(false)
    const [order, setorder] = useState(null)
    async function getallorders() {
        setload(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        console.log(data);
        setorder(data)
        setload(false)
    }
    useEffect(() => { getallorders(); }, [])
    if (load) {
        return <div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>
    }
    return (
        <section className="py-5 bg-secondary-subtle my-5">
            <div className="container">
                {order ? order.map((order, idx) => <div key={idx} className="mb-5 pb-5 border-bottom border-secondary-subtle">
                    <div className="d-flex">
                        {order.cartItems.map((item, idx) => <div key={idx} className="w-25">
                            <img src={item.product.imageCover} alt="#" className="w-100 ps-3 py-3 pb-5" />
                        </div>)}
                    </div>

                    <div>
                        <h4 className="text-success">Total Order Price : {order.totalOrderPrice} EGP</h4>
                        <h4 className="text-success">Payment Method Type : {order.paymentMethodType}</h4>
                    </div>

                </div>)
                    : <h2 className="text-center text-success my-5">No Last Orders</h2>}
            </div>
        </section>
    )
}
