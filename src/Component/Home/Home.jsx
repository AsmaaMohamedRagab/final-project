import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { date } from "yup"
import HomeSlider from "../HomeSlider/HomeSlider"
import CategorySlider from "../CategorySlider/CategorySlider"
import { Link } from "react-router-dom"
import { cartContext } from "../CartContext/CartContext.jsx"
import toast from "react-hot-toast"
import { washlistcontext } from "../washlistcontext/WashlistContext.jsx"
export default function Home() {
    const [loader, setloader] = useState(false)
    const { data, isLoading, isFetching, error } = useQuery("product", getAllProduct)
    const { Addtocart } = useContext(cartContext)
    const { AddProductToWishList, toggleWishList, IsInWishList,GetProductToWishList,washList,RemoveProductFromWishList,setwashList } = useContext(washlistcontext)
    useEffect(function () {
        GetProductToWishList();
    }, []);
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
    function removeColor(id) {
        if (washList.includes(id)) {
            setwashList(oldValues => {
                return oldValues.filter(item => item !== id)
            })
            RemoveProductFromWishList(id)
        }
    }
    return (
        <>
            <section>
                <div className="container py-5">
                    <HomeSlider />
                    <CategorySlider />
                    <div className="row g-3 mt-3">
                        {data.data.data.map(function (item, idx) {
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
                                            washList.includes(item.id)?removeColor(item.id):AddProductToWishList(item.id)
                                        }
                                        } className="d-flex justify-content-end py-3" ><i className={washList.includes(item.id) ? "fa-solid fa-heart fa-lg text-danger" : "fa-solid fa-heart fa-lg"}></i></div>
                                        <button onClick={() => addProduct(item.id)} className="w-100 bg-success text-white border-0 rounded-2 p-2"> Add to cart</button>
                                    </div >
                                </div>
                            )
                        })}

                    </div>
                </div>

            </section >
        </>

    )
}
