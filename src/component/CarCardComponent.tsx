import type { Car } from "../types";
import { Link } from "react-router-dom";

function CarCardComponent({car}: {car: Car}) {
    return (
        <div>
        <Link to={`/cars/${car.id}`} className="card-link">
            <div className="card">
                <div className="card-brand">{car.model.brand.brand}</div>
                <div className="card-model">{car.model.model}</div>
                <div className="card-price">{car.model.pricePerDay}€ <span>/ day</span></div>
                <div className="card-meta">
                <span>{car.model.year}</span>
                <span>{car.model.seats} seats</span>
                <span className={car.status === "AVAILABLE" ? "pill pill-available" : "pill pill-rented"}>
                    {car.status}
                </span>
                </div>
            </div>
        </Link>
        </div>
        
        
    )
}

export default CarCardComponent;