import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
export const washlistcontext = createContext()
const WashlistContextProvider = ({ children }) => {
    const [wishlistproduct, setwishlistproduct] = useState(null)
    const [IsInWishList, setIsInWishList] = useState(false)
    async function AddProductToWishList(productid) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId: productid },
                { headers: { token: localStorage.getItem("tkn") } })
            toast.success("It has been successfuly added")
            GetProductToWishList()
            return data
        }
        catch {
            toast.error("It dosen't add")
        }
    }
    async function GetProductToWishList() {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token: localStorage.getItem("tkn") }
        })
        setwishlistproduct(data.data)
    }
    async function RemoveProductFromWishList(productid) {
        try{
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,
                {
                    headers: {
                        token: localStorage.getItem("tkn")
                    }
                }
            )
            GetProductToWishList()
            toast.success("Item has been deleted")
            return data
        }
        catch{
            toast.error("error")
        }
        
    }
    function toggleWishList(){
        setIsInWishList(!IsInWishList)
    }
    useEffect(function () {
        GetProductToWishList()
    }, [])
    return (
        <washlistcontext.Provider value={{ AddProductToWishList, wishlistproduct,RemoveProductFromWishList, toggleWishList,IsInWishList }}>
            {children}
        </washlistcontext.Provider>

    )
}

export default WashlistContextProvider