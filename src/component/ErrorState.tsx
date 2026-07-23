import { Link } from "react-router-dom"

type ErrorStatePros = {
    title?: string,
    message?: string
}

function ErrorState({title = "Something went wrong", message} : ErrorStatePros){
    return (
         <div className="error-state">
            <div className="error-state__icon">🚗</div>
            <h2 className="error-state__title">{title}</h2>
            {message && <p className="error-state__message">{message}</p>}
            <Link to="/cars" className="error-state__button">
                Back to cars
            </Link>
        </div>
    )
}

export default ErrorState;