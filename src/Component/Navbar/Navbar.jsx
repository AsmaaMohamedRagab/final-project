import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/freshcart-logo.svg"
import { useContext } from "react";
import { tokenContext } from "../tokenContext/tokenContext";
import style from "./navbar.module.css"
import { cartContext } from "../CartContext/CartContext.JSX";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




export default function Navbarcomp() {
    const { token, setToken } = useContext(tokenContext)
    const { numOfProduct } = useContext(cartContext)
    const navigate = useNavigate()
    function logout() {
        setToken(null)
        localStorage.removeItem("tkn")
        navigate("/signin")
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-secondary">
                <Container>
                    <Navbar.Brand href="#home"><img src={logo} alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token ? <><NavLink to="/" className="pe-3 text-decoration-none text-black">Home</NavLink>
                                <NavLink to="cart" className="pe-3 text-decoration-none text-black position-relative">Cart<span className={style.badge + "badge badge-danger bg-danger rounded-circle px-1 position-absolute"}>{numOfProduct}</span></NavLink>
                                <NavLink to="products" className="px-md-3 text-decoration-none text-black">Product</NavLink>
                                <NavLink to="/category" className="pe-3 text-decoration-none text-black">Categories</NavLink>
                                <NavLink to="/brands" className="pe-3 text-decoration-none text-black">Brands</NavLink>
                                <NavLink to="/allorders" className="pe-3 text-decoration-none text-black">Allorders</NavLink>
                                <NavLink to="/washlist" className="pe-3 text-decoration-none text-black">WashList</NavLink>
                            </> : ""}
                        </Nav>
                    </Navbar.Collapse>
                    <div className="icons">
                        <i className="fa-brands fa-instagram px-2"></i>
                        <i className="fa-brands fa-facebook px-2"></i>
                        <i className="fa-brands fa-tiktok px-2"></i>
                        <i className="fa-brands fa-twitter px-2"></i>
                        <i className="fa-brands fa-linkedin px-2"></i>
                        <i className="fa-brands fa-youtube px-2"></i>
                        {token ? <button onClick={logout} className="ps-2 text-decoration-none text-black border-0 bg-transparent">SignOut</button> : <><NavLink to="/signin" className="ps-2 text-decoration-none text-black">SignIn</NavLink>
                            <NavLink to="/signup" className="ps-2 text-decoration-none text-black">SignUp</NavLink></>}

                    </div>
                </Container>
            </Navbar>
        </>
    )
}