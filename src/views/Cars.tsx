import { useEffect, useState } from "react";
import api from "../api.ts"
import CarCardComponent from "../component/CarCardComponent.tsx";
import type { Car } from "../types.ts";
import { formatErrorMessage } from "../utils.ts";



function Cars(){
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        api.get("/cars")
        .then((res) => setCars(res.data))
        .catch(err => setError(formatErrorMessage(err)))
        .finally(() => setLoading(false));
    }, [])

    return (
    <div>
      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg">{error}</p>}
      {!loading && !error &&
      <ul>
        <div className="cars-grid">
        {cars.map((car) => (
          <li key={car.id}>
              <CarCardComponent car={car} key={car.id}/>
          </li>
        ))}
        </div>
        
      </ul>
      }
    </div>
  );
}



export default Cars;