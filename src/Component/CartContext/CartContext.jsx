import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { tokenContext } from "../tokenContext/tokenContext";
export const cartContext = createContext()
export default function CartContextProvider({ children }) {
    const { token } = useContext(tokenContext)
    const [numOfProduct, setnumOfProduct] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [product, setproduct] = useState([])
    const [cartid, setcartid] = useState(null)    
    async function Addtocart(productid) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
                productId: productid
            }, { headers: { token: localStorage.getItem("tkn") } })
            // setproduct(data.data.products)
            // settotalPrice(data.data.totalCartPrice)
            // setnumOfProduct(data.numOfCartItems)
            getUserCart()
            return data
        }
        catch {
            console.log(error);
        }
    }
    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setproduct(data.data.products)
            settotalPrice(data.data.totalCartPrice)
            setnumOfProduct(data.numOfCartItems)
            setcartid(data.data._id)

        }
        catch {
            console.log("error");
        }
    }
    async function updateCart(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            }, { headers: { token: localStorage.getItem("tkn") } })
            setproduct(data.data.products)
            settotalPrice(data.data.totalCartPrice)
            setnumOfProduct(data.numOfCartItems)
        }
        catch {
            console.log(error);
        }
    }
    async function deleteItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setproduct(data.data.products)
            settotalPrice(data.data.totalCartPrice)
            setnumOfProduct(data.numOfCartItems)
            return data
        }
        catch {
            console.log(error);
        }
    }
    async function clearCart() {
        try {
            const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setproduct(0);
            settotalPrice([]);
            setnumOfProduct(0);
        }
        catch{
            console.log(error);
            
        }
    }
    useEffect(function () {
        if (token != null) {
            getUserCart()
        }
    }, [token])
    return (
        <cartContext.Provider value={{ Addtocart, product, totalPrice, numOfProduct, updateCart, deleteItem,clearCart,cartid,setproduct, settotalPrice, setnumOfProduct }}>
            {children}
        </cartContext.Provider>
    )
}
