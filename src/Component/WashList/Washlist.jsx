import React, { useContext } from 'react'
import { washlistcontext } from '../washlistcontext/WashlistContext'
import { cartContext } from '../CartContext/CartContext'

const Washlist = () => {
  const { wishlistproduct, RemoveProductFromWishList } = useContext(washlistcontext)
  const { Addtocart } = useContext(cartContext)
  return (
    <section>
      <div className="container py-4 bg-secondary-subtle my-5">
        {wishlistproduct?.length != 0 ? <>
          <h1 className='p-2'>My Wish List</h1>
          {wishlistproduct?.map((item, idx) =>
            <div key={idx} className="d-flex flex-row justify-content-between align-items-center border-success-subtle border-bottom">
              <div className="w-75 d-flex my-3">
                <img src={item.imageCover} alt="" className="w-25" />
                <div className="p-5">
                  <p>{item.title}</p>
                  <p className="text-success">Price :{item.price} EGP</p>
                  <button onClick={() => RemoveProductFromWishList(item._id)} className="border-0 bg-transparent text-danger"><i className="fa-solid fa-trash pe-1"></i>Remove</button>
                </div>
              </div>
              <div className="w-25 d-flex">
                <button onClick={() => {
                  Addtocart(item._id)
                  RemoveProductFromWishList(item._id)
                }
                } className="ms-3 p-3 border border-success-subtle border-1 rounded-2 ">Add To Cart</button>
              </div>
            </div>
          )} </> : <div className="text-center text-success py-5 fw-bolder "><h1>No Product To Display</h1></div>
        }
      </div>
    </section>
  )
}

export default Washlist