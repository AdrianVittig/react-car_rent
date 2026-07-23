import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import type { Car } from "../types";
import { AxiosError } from "axios"

export default function BookingPage(){
    const { carId } = useParams();

    const [car, setCar] = useState<Car | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [rentDate, setRentDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [bookingError, setBookingError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`cars/${carId}`)
            .then(res => setCar(res.data))
            .catch((err) => setError(formatErrorMessage(err)))
            .finally(() => setLoading(false));
    }, [carId]);


    return(
        <div>
        <Link to="/cars" className="back-link">← Back to cars</Link>

        {loading && <p className="status-msg">Loading...</p>}
        {error && <p className="status-msg">{error}</p>}

        {bookingError && (
            <div className="modal-overlay">
                <div className="modal-box">
                    <p className="modal-message">{bookingError}</p>
                    <button
                        className="modal-close"
                        onClick={() => setBookingError(null)}
                    >
                        Close
                    </button>
                </div>
            </div>
        )}

        {showSuccess && (
            <div className="toast toast--success">
                <span className="toast__icon">✓</span>
                <span>Booked successfully!</span>
            </div>
        )}
        
        {!loading && !error && car && (
                        <div className="booking-page">
                        <div className="booking-card">
                            <h1 className="booking-title">Book your car</h1>

                            <section className="car-summary">
                                <div className="car-summary__image">
                                </div>
                                <div className="car-summary__info">
                                    <h2 className="car-summary__name">
                                        {car.model.brand.brand}
                                        {car.model.model}
                                    </h2>
                                    <p className="car-summary__plate">
                                        {car.plate}
                                    </p>
                                    <p className="car-summary__price">
                                        {car.model.pricePerDay} EUR / day
                                    </p>
                                </div>
                            </section>

                            <div className="booking-form">
                                <div className="form-group">
                                    <label htmlFor="rentDate">Rent Date</label>
                                    <input
                                        id="rentDate"
                                        type="datetime-local"
                                        value={rentDate}
                                        onChange={(e) => setRentDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="returnDate">Return Date</label>
                                    <input
                                        id="returnDate"
                                        type="datetime-local"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                    />
                                </div>

                                <div className="price-summary">
                                    <div className="price-summary__row">
                                        <span>Count of days</span>
                                        <span>{calculateDaysCount(rentDate, returnDate)} days</span>
                                    </div>
                                    <div className="price-summary__row price-summary__row--total">
                                        <span>Total: </span>
                                        <span>{calculateTotalPrice(car.model.pricePerDay, calculateDaysCount(rentDate, returnDate))} EUR</span>
                                    </div>
                                </div>
                                {car.status === "AVAILABLE" &&
                                    <button
                                        type="button"
                                        className="booking-submit"
                                        onClick={book}
                                    >
                                        Confirm
                                    </button>
                                }
                                
                            </div>
                        </div>
                    </div>
                )}

        </div>
    )


    function book(){
        if(!rentDate || !returnDate){
            setBookingError("Please fill in all fields!");
            return;
        }
        api.post('/rents', {carId, rentDate, returnDate})
        .then(() => {
            setShowSuccess(true);
            setTimeout(() => navigate("/cars"), 1000)
        })
        .catch(err => setBookingError(formatErrorMessage(err))
        )
    }

    function calculateDaysCount(rentDate: string, returnDate: string) : number{
        const rentDateInDate = new Date(rentDate);
        const returnDateInDate = new Date(returnDate);

        let dividor = 1000 * 60 * 60 * 24;
        let divided = (returnDateInDate.getTime() - rentDateInDate.getTime()) / dividor;
        let daysCount = Math.ceil(divided);

        if(Number.isNaN(daysCount)){
            daysCount = 0;
        }

        if(daysCount < 1){
            daysCount = 0;
        }
        
        return daysCount;
    }

    function calculateTotalPrice(basePrice: number, daysCount: number){
        return (basePrice * daysCount).toFixed(2);
    }

    function formatErrorMessage(err: AxiosError) : string{

        if(!err.response){
            return "Something went wrong!"
        }

        const data = err?.response.data;



        if(typeof data === "string"){
            return data;
        }

        if(typeof data === "object"){
            return Object.values(data as Record<string, string>).join(", ");
        }

        return "Something went wrong!"
    }
}


