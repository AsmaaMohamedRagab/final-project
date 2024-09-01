import axios from "axios"
import style from "./Brands.module.css"
import { useQuery } from "react-query";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Brands() {
    const [brandData, setbrandData] = useState(null);
    const [loader, setloader] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data, isLoading } = useQuery("brands", getAllBrands)
    async function getAllBrands() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands?limit=40")
    }
    async function brandDetails(brandId) {
        setloader(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
        setbrandData(data.data)
        setloader(false)
        console.log(data);
        
    }
    if (isLoading || loader ) {
        return <div className="bg-success vh-100 d-flex justify-content-center align-items-center"><i className="fa-solid fa-spinner fa-2xl fa-spin fs-1 text-white "></i></div>
    }
    return (
        <div>
            <h1 className="text-center text-success mt-5">All Brands</h1>
            <div className="container">
                <div className="row g-4 py-4">
                    {data.data.data.map(function (brand, idx) {
                        return (
                            <div onClick={() => {
                                handleShow()
                                brandDetails(brand._id)
                            }} key={idx} className="col-md-3 p-2">
                                <div className={"m-auto text-center border rounded-bottom-2" + style.test } >
                                    <img src={brand.image} alt="brandImage" className="w-100" />
                                    <p className="py-3">{brand.name}</p>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="text-success">{brandData?.name}</h1>
                            <p>{brandData?.slug}</p>
                        </div>
                        <div>
                            <img src={brandData?.image} alt="brandImage" className="w-100" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}