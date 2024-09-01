import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import style from "./CategorySlider.module.css"

export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };
    const {data, isLoading} = useQuery("category", getcategory)
    async function getcategory() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    return (
        <section className="py-3">
            <h3>Shop Popular Categories</h3>
            <Slider {...settings}>
                {data?.data.data.map(function (item , idx) {
                    return (
                        <div key={idx}>
                            <img src={item.image} alt="#" className={style.category} />
                            <h4 className="text-success text-center fs-5">{item.name}</h4>
                        </div>
                    )
                })}
            </Slider>
        </section>
    );
}