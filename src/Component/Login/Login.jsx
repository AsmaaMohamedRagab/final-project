import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { tokenContext } from "../tokenContext/tokenContext"


export default function Login() {
    const {setToken}=useContext(tokenContext)
    const navigate=useNavigate()
    const [IsLoading, setIsLoading] = useState(false)
    const user = {
        email: "",
        password: "",
    }
    async function registerApi(values) {
        setIsLoading(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            toast.success(data.message)
            setIsLoading(false)
            navigate("/")
            setToken(data.token)
            localStorage.setItem("tkn",data.token)
        }
        catch (err) {
            toast.error(err.response.data.message)
            setIsLoading(false)

        }

    }
    const validation = yup.object().shape({
        email: yup.string().required("Your Email is Required").email("the format of mail is required"),
        password: yup.string().required("You must enter password").matches(/^[A-Z][a-z 0-9]{4,10}$/, "the password must be complex"),
    }
    )

    const formik = useFormik({
        initialValues: user,
        onSubmit: registerApi,
        validationSchema: validation,
    })

    return (
        <>
            <div className="w-50 mx-auto py-2">
                <h3 className="mt-2">Login Now :</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control shadow-none" id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? (<div className="bg-danger-subtle p-1 rounded-2"><p>Error :{formik.errors.email}</p></div>) : ("")}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control shadow-none" id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ? (<div className="bg-danger-subtle p-1 rounded-2"><p>Error :{formik.errors.password}</p></div>) : ("")}
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={"/forgetpassword"} className="text-decoration-none text-success">
                        <p className="fw-bold fs-5">forget your password ?</p>
                        </Link>
                        <button type="submit" className="btn btn-success">{IsLoading == true ? (<div className="text-white"><i className="fa-solid fa-spinner fa-spin"></i></div>) : ("Login")}</button>
                    </div>
                </form>
            </div>
        </>
    )
}