import "./SearchModal.css";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { City } from "../../models/City";

type ModalProps = {
    onClose: () => void;
}

type ApiCity = {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
    country: string;
};

type ApiResponse = {
    results: ApiCity[];
};

function SearchModal({ onClose }: ModalProps){
    const [city, setCity] = useState<City[] | null>(null);
    const [cityName, setCityName] = useState('');

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        setCityName(e.target.value);
    };


    async function searchCity(){
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`);
        const data: ApiResponse = await response.json();
        if(data.results){
            const cityResults: City[] = data.results.map((c: ApiCity) => ({
                name: c.name,
                latitude: c.latitude,
                longitude: c.longitude,
                timezone: c.timezone,
                country: c.country
            }));
            setCity(cityResults);
        }
        else{
            setCity([]);
        }
    }


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="searchBox">
                    <h2>Város keresése</h2>
                    <div>Név</div>
                    <input type="text" value={cityName} onChange={handleInputChange}/>
                    <button className="btn" onClick={searchCity}>Keresés</button>
                </div>
                <div className="resultBox">
                    <h2>Keresés eredménye</h2>
                    {city && city.length > 0 ? (
                        city.map((c: City) => (
                            <div className="cityCard">{c.name} - {c.country}</div>
                        ))
                    ) : (
                        <p>Nincs találat</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;