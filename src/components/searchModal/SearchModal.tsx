import "./SearchModal.css";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { City } from "../../models/City";

type ModalProps = {
    onClose: (city: City | null) => void;
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

    document.getElementById("nameInput")?.addEventListener("keydown", function(e) {
                if(e.key === "Enter"){
                    searchCity();
                }
            });


    async function searchCity(){
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`);
        const data: ApiResponse = await response.json();
        console.log(data);
        if(data.results){
            const cityResults: City[] = data.results.map((c: ApiCity) => ({
                name: c.name,
                latitude: c.latitude,
                longitude: c.longitude,
                timezone: c.timezone,
                country: c.country
            }));
            document.getElementsByClassName("resultBox")[0].classList.remove("hide");
            setCity(cityResults);
        }
        else{
            setCity([]);
        }
    }

    function chooseCity(city: City){
        localStorage.setItem("selectedCity", JSON.stringify(city));
        onClose(city);
    }


    return (
        <div className="modal-overlay" onClick={() => onClose(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="searchBox">
                    <h2>Város keresése</h2>
                    <div>Név</div>
                    <input type="text" value={cityName} onChange={handleInputChange} id="nameInput"/>
                    <button className="btn" onClick={searchCity}>Keresés</button>
                </div>
                <div className="resultBox hide">
                    <h2>Keresés eredménye</h2>
                    {city && city.length > 0 ? (
                        city.map((c: City) => (
                            <div className="cityCard" onClick={() => chooseCity(c)}>{c.name} - {c.country}</div>
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