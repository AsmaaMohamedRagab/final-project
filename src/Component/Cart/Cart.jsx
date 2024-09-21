import { useContext } from "react"
import { cartContext } from "../CartContext/CartContext.jsx"
import { Link } from "react-router-dom"

export default function Cart() {
    const { product, totalPrice, numOfProduct, updateCart, deleteItem,clearCart } = useContext(cartContext)
    return (
        <section>
            <div className="container py-4 bg-secondary-subtle my-3 border-bottom border-1">
                {product?.length != 0 ? <>
                    <h5>Shop Chart:</h5>
                    <p className="text-success">Total Cart Price :{totalPrice} EGP</p>
                    <button onClick={clearCart} className="border-0 bg-danger py-2 px-3 text-white">Clear</button>
                    <Link to="/payment" className="border-0 bg-success py-2 px-3 text-decoration-none ms-2 text-white">Payment</Link>
                    {product?.map((item, idx) =>
                        <div key={idx} className="d-flex flex-row justify-content-between align-items-center border-success-subtle border-bottom ">
                            <div className="w-75 d-flex my-3">
                                <img src={item.product.imageCover} alt="" className="w-25" />
                                <div className="p-5">
                                    <p>{item.product.title}</p>
                                    <p className="text-success">Price :{item.price} EGP</p>
                                    <button onClick={() => deleteItem(item.product.id)} className="bg-success text-center text-white p-2">Remove</button>
                                </div>
                            </div>
                            <div className="w-25 d-flex">
                                <button onClick={() => updateCart(item.product.id, item.count + 1)} className="ms-3 bg-success border-success px-2 ">+</button>
                                <p className="ms-3 mt-3">{item.count}</p>
                                <button disabled={item.count == 0 ? true : false} onClick={() => updateCart(item.product.id, item.count - 1)} className={`ms-3  bg-success border-success px-2 ${item.count == 0 ? "disabled opacity-50" : ""}`}>-</button>
                            </div>
                        </div>
                    )} </> : <div className="text-center text-success py-5 fw-bolder "><h1>No Product To Display</h1></div>
                }

            </div>
        </section>
    )
}