import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { cartContext } from "../CartContext/CartContext.JSX"
import toast from "react-hot-toast"
import { washlistcontext } from "../washlistcontext/WashlistContext.jsx"
export default function Products() {
    const [loader, setloader] = useState(false)
    const [filter, setfilter] = useState("")
    const { data, isLoading, isFetching, error } = useQuery("product", getAllProduct)
    const { Addtocart } = useContext(cartContext)
    const { AddProductToWishList, toggleWishList, IsInWishList } = useContext(washlistcontext)
    async function getAllProduct() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    if (isLoading) {
        return <div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>
    }
    async function addProduct(id) {
        setloader(true)
        const data = await Addtocart(id)
        console.log(data);
        if (data) {
            toast.success(data.message)
            setloader(false)
        } else {
            toast.error("error")
            setloader(false)
        }

    }
    return (
        <>
            <section>
                <div className="container py-5">
                    <input onChange={(e) => setfilter(e.target.value)} value={filter} type="search" className="w-75 py-1 ps-2 border rounded-2 my-4 mx-5" placeholder="Search...." />
                    <div className="row g-3 mt-3">
                        {data.data.data.map(function (item, idx) {
                            if (item.title.toLowerCase().includes(filter.toLowerCase())) {
                                return (
                                    <div key={idx} className="col-lg-2 col-md-4 col-sm-6 ">
                                        <div className="inner bg-body-secondary p-3">
                                            <Link to={`/productdetails/${item.id}`} className="text-decoration-none">
                                                <img className="w-100" src={item.imageCover} alt="image" />
                                                <h4 className="text-success">{item.category.name}</h4>
                                                <p className="text-black">{item.title.split(" ").slice(0, 2).join(" ")}</p>
                                                <div className="d-flex justify-content-between align-items-center text-black">
                                                    <p>{item.price}EGP</p>
                                                    <h5><i className="fa-solid fa-star text-warning"></i>{item.ratingsAverage}</h5>
                                                </div>
                                            </Link>
                                            <div onClick={() => {
                                                AddProductToWishList(item.id)
                                                toggleWishList()
                                            }
                                            } className="d-flex justify-content-end py-3" ><i className={IsInWishList ? "fa-solid fa-heart fa-lg text-danger" : "fa-solid fa-heart fa-lg"}></i></div>
                                            <button onClick={() => addProduct(item.id)} className="w-100 bg-success text-white border-0 rounded-2 p-2"> Add to cart</button>
                                        </div >
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </section >
        </>
    )


}
