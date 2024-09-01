import { useParams } from "react-router-dom"
import style from "./ProductDetails.module.css"
import { useQuery } from "react-query"
import axios from "axios"
import { useContext, useState } from "react"
import { cartContext } from "../CartContext/CartContext.JSX"
import toast from "react-hot-toast"
export default function ProductDetails() {
    const [loader, setloader] = useState(false)
    const { id } = useParams()
    const {Addtocart}=useContext(cartContext)
    const { data, isLoading } = useQuery(`product${id}`, getDetails)
    async function getDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    async function addProduct(){
        setloader(true)
      const data =  await Addtocart(id)
      console.log(data);
      if(data){
        toast.success(data.message)
        setloader(false)
      }else{
        toast.error("error")
        setloader(false)
      }
      
    }
    if (isLoading) {
        return <div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>
    }

    return (
        <>
            <section className="py-5 px-3">
                <div className="d-flex align-align-items-center justify-content-center">
                    <div className="w-25  p-5">
                        <img src={data?.data.data.imageCover} alt="#" className="w-100" />
                    </div>
                    <div className="w-75 p-5">
                        <h2 className="text-success">{data?.data.data.title}</h2>
                        <p>{data?.data.data.description}</p>
                        <p className="text-success">{data?.data.data.category.name}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p>{data?.data.data.price}</p>
                            </div>
                            <div>
                                <p><i className="fa-solid fa-star text-warning"></i>{data?.data.data.ratingsAverage}</p>
                            </div>
                        </div>
                        <button onClick={addProduct} className="bg-success text-white text-center rounded-2 border-0 p-2 w-100">{loader ? <i className="fa-solid fa-spinner fa-spin text-white "></i>:"Add to cart"}</button>
                    </div>
                </div>
            </section>
        </>
    )
}
