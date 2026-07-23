import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import type { Car } from "../types";
import { formatErrorMessage, formatFuel, formatModel } from "../utils";
import { useAuth } from "../context/AuthContext";
import ErrorState from "../component/ErrorState";

function CarDetailsPage() {
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`cars/${id}`)
            .then(res => setCar(res.data))
            .catch((err) => setError(formatErrorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div>
            <Link to="/cars" className="back-link">← Back to cars</Link>

            {loading && <p className="status-msg">Loading...</p>}
            {error && (
                <ErrorState
                    title="Car not found"
                    message="This car doesn't exist or has been removed."
                />
            )}

            {!loading && !error && car && (
                <div className="car-details">
                    <div className="details-head">
                        <div>
                            <div className="details-brand">{car.model.brand.brand}</div>
                            <h1>{formatModel(car.model.model)}</h1>
                        </div>
                        <span className={car.status === "AVAILABLE" ? "pill pill-available" : "pill pill-rented"}>
                            {car.status}
                        </span>
                    </div>

                    <div className="details-price">
                        {car.model.pricePerDay}€ <span>/ day</span>
                    </div>

                    <div className="details-row">
                        <span className="details-label">Plate</span>
                        <span className="details-value">{car.plate}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Year</span>
                        <span className="details-value">{car.model.year}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Type</span>
                        <span className="details-value">{formatFuel(car.model.type)}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Color</span>
                        <span className="details-value">{formatFuel(car.model.color)}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Fuel</span>
                        <span className="details-value">{formatFuel(car.model.fuel)}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Seats</span>
                        <span className="details-value">{car.model.seats}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Doors</span>
                        <span className="details-value">{car.model.doors}</span>
                    </div>
                    <div className="details-row">
                        <span className="details-label">Minimum age</span>
                        <span className="details-value">{car.model.minimalAge}</span>
                    </div>

                    {!auth.token && 
                        <Link to="/login" className="login-to-book">
                            Log in to book !
                        </Link>
                    }

                    {auth.token && 
                        car.status === "AVAILABLE" &&
                        <button className="book-btn" onClick={() => bookCar(car.id)}>Book now!</button>
                    }
                    
                </div>
            )}
        </div>
    );

    function bookCar(carId: number){
        navigate(`/booking/${carId}`);
    }
}



export default CarDetailsPage;