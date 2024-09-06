import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Component/Home/Home.jsx'
import Products from './Component/Products/Products.jsx'
import Cart from './Component/Cart/Cart.jsx'
import Category from './Component/Category/Category.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Login from './Component/Login/Login.jsx'
import Register from './Component/Register/Register.jsx'
import Notfound from './Component/NotFound/Notfound.jsx'
import { Toaster } from 'react-hot-toast'
import TokenContextProvider from './Component/tokenContext/tokenContext.jsx'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Component/CartContext/CartContext.jsx'
import Payment from './Component/payment/Payment.jsx'
import Allorders from './Component/allorders/Allorders.jsx'
import Washlist from './Component/WashList/Washlist.jsx'
import WashlistContextProvider from './Component/washlistcontext/WashlistContext.jsx'
import ForgetPassword from './Component/forgetpassword/ForgetPassword.jsx'
import Resetcode from './Component/resetcode/Resetcode.jsx'
import Resetpassword from './Component/resetpassword/Resetpassword.jsx'


function App() {
  const x = new QueryClient()
  const myRouter = createBrowserRouter([{
    path: "/", element: <Layout />, children: [
      { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "/category", element: <ProtectedRoute><Category /></ProtectedRoute> },
      { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: "/allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: "/washlist", element: <ProtectedRoute><Washlist /></ProtectedRoute> },
      { path: "/productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "/signin", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
      { path: "/resetcode", element: <Resetcode /> },
      { path: "/resetpassword", element: <Resetpassword /> },
      { path: "*", element: <Notfound /> },]
  }])
  return (
    <QueryClientProvider client={x}>
      <TokenContextProvider>
        <CartContextProvider>
          <WashlistContextProvider>
            <Toaster />
            <RouterProvider router={myRouter} />
          </WashlistContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>

  )
}

export default App
