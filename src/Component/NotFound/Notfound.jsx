import error from "./../../assets/error.svg"
export default function Notfound(){
    return(
        <>
        <div className="d-flex justify-content-center align-items-center py-3">
            <img src={error} alt="errorImage" className="w-50" />
        </div>
        </>
    )
}