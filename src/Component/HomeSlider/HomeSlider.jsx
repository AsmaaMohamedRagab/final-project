import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/slider-image-1.jpeg"
import slider2 from "./../../assets/slider-image-2.jpeg"
import slider3 from "./../../assets/slider-image-3.jpeg"
import blog1 from"./../../assets/blog-img-1.jpeg"
import blog2 from"./../../assets/blog-img-2.jpeg"
import style from "./HomeSlider.module.css"

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };
    return (
        <section>
            <div className="d-flex justify-content-center align-items-center">
                <div className="w-75">
                    <Slider {...settings}>
                        <div>
                            <img src={slider1} alt="#" className={style.height} />
                        </div>
                        <div>
                            <img src={slider2} alt="#" className={style.height} />
                        </div>
                        <div>
                            <img src={slider3} alt="#" className={style.height} />
                        </div>
                    </Slider>
                </div>
                <div className="w-25 d-flex flex-column">
                    <div><img src={blog1} alt="#" className={style.blog} /></div>
                    <div><img src={blog2} alt="#" className={style.blog} /></div>
                </div>
            </div>
        </section>
    );
}