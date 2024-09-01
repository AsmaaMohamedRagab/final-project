import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

export default function Register() {
    const navigate=useNavigate()
    const [IsLoading, setIsLoading] = useState(false)
    const user = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
    }
    async function registerApi(values) {
        setIsLoading(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            console.log(data);
            toast.success(data.message)
            setIsLoading(false)
            navigate("/signin")
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
            setIsLoading(false)

        }

    }
    const validation = yup.object().shape({
        name: yup.string().required("Your Name is Required").min(3, "the Min character is 3").max(15, "the max character is 15"),
        email: yup.string().required("Your Email is Required").email("the format of mail is required"),
        password: yup.string().required("You must enter password").matches(/^[A-Z][a-z 0-9]{4,10}$/, "the password must be complex"),
        rePassword: yup.string().required("You must enter repassword").oneOf([yup.ref("password")], "the repassword must be the same password"),
        phone: yup.string().required("Your phone is required").matches(/^01[0125][0-9]{8}$/, "the phone must be correct"),
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
                <h3 className="mt-2">Register Now :</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control shadow-none" id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.name && formik.touched.name ? (<div className="bg-danger-subtle p-1 rounded-2"><p>Error :{formik.errors.name}</p></div>) : ("")}

                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="rePassword" className="form-label">Repassword:</label>
                        <input type="password" className="form-control shadow-none" id="rePassword"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.rePassword && formik.touched.rePassword ? (<div className="bg-danger-subtle p-1 rounded-2"><p>Error :{formik.errors.rePassword}</p></div>) : ("")}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" className="form-control shadow-none" id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.errors.phone && formik.touched.phone ? (<div className="bg-danger-subtle p-1 rounded-2"><p>Error :{formik.errors.phone}</p></div>) : ("")}

                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">{IsLoading == true ? (<div className="text-white"><i className="fa-solid fa-spinner fa-spin"></i></div>) : ("Register")}</button>
                    </div>
                </form>
            </div>
        </>
    )
}