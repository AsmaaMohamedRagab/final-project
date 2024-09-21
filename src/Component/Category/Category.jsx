import axios from "axios"
import { useEffect, useState } from "react";
import style from "./category.module.css"
export default function Category() {
    const [categories, setcategories] = useState(null)
    const [loader, setloader] = useState(false)
    const [catdetails, setcatdetails] = useState(null)
    const [name, setname] = useState(null)
    const [loading, setloading] = useState(false)
    async function getCategory() {
        setloader(true)
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        console.log(data.data);
        setcategories(data.data)
        setloader(false)
    }
    async function getSubCategory(catid , catname) {
        setloading(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catid}/subcategories`)
        setcatdetails(data.data)
        setname(catname)
        console.log(data.data, "hi");
        setloading(false)
        
    }
    useEffect(function () {
        getCategory()
    }, [])
    if (loader || loading) {
        return (
            <div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>
        )
    }
    return (
        <>
            <section>
                <div className="container py-5">
                    <div className="row g-5">
                        {categories?.map(function (item, idx) {
                            return (
                                <div onClick={function(){getSubCategory(item._id ,item.name)}} key={idx} className="col-md-4">
                                    <div className={style.content + " w-100"}>
                                        <img src={item.image} alt="categoryimage" className={style.cat + " w-100"} />
                                        <p className="text-center text-success py-3 fw-bolder fs-2 border border-bottom-0 border-start-0 border-end-0">{item.name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            {catdetails!= null ? <section>
                <div className="container py-4">
                <h1 className="text-center text-success pb-3">{name} subcategories</h1>
                    <div className="row g-3">
                        {catdetails.map(function (cat, idx) {
                            return(
                            <div key={idx} className="col-md-3">
                                <div className={style.content}>
                                    <p className="text-center fs-3 fw-medium">{cat.name}</p>
                                </div>
                            </div>)
                        })}

                    </div>
                </div>
            </section> : ""}
        </>
    )
}