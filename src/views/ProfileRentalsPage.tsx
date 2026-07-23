import { useEffect, useState } from "react";
import api from "../api";
import type { Rent } from "../types";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { formatErrorMessage } from "../utils";

function ProfileRentalsPage(){
    const [rentals, setRentals] = useState<Rent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [cancellingError, setCancellingError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        api.get("/rents/me")
        .then(res => setRentals(res.data))
        .catch((err: AxiosError) => setError(formatErrorMessage(err)))
        .finally(() => setLoading(false))
    }, []);

    return (
        <div className="rentals-page">
            <Link to="/cars" className="back-link">← Back to cars</Link>
            <h1 className="rentals-title">My Rentals</h1>

            {loading && <p className="status-msg">Loading...</p>}
            {error && <p className="status-msg">{error}</p>}

            {cancellingError && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p className="modal-message">{cancellingError}</p>
                        <button
                            className="modal-close"
                            onClick={() => setCancellingError(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="toast toast--success">
                    <span className="toast__icon">✓</span>
                    <span>Rental cancelled</span>
                </div>
            )}


            {!loading && !error && rentals.length === 0 && (
                <p className="status-msg">You have no rentals yet.</p>
            )}

            {!loading && !error && rentals.length > 0 && (
                <div className="rentals-list">
                    {rentals.map(rent => (
                        <div className="rental-card" key={rent.id}>
                            <div className="rental-card__car">
                                {rent.car.model.brand.brand} {rent.car.model.model}
                            </div>
                            <div className="rental-card__dates">
                                <span className="date-block">
                                    <span className="date-label">From</span>
                                    {formatDate(rent.rentDate)}
                                </span>
                                <span className="date-block">
                                    <span className="date-label">To</span>
                                    {formatDate(rent.returnDate)}
                                </span>
                            </div>
                            <div className="rental-card__price">
                                {rent.totalPrice.toFixed(2)}
                            </div>
                             <div className="rental-cancel__booking">
                                <button type="button" onClick={() => cancelBooking(rent.id)}>
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    function formatDate(iso: string): string {
        return new Date(iso).toLocaleString("bg-BG", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        
    }

    function cancelBooking(rentId: number){
        api.put(`/rents/${rentId}/cancel`)
        .then(() => {
            setRentals(prev => prev.filter(r => r.id !== rentId));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        })
        .catch((err : AxiosError) => setCancellingError(formatErrorMessage(err)));
    }
}

export default ProfileRentalsPage