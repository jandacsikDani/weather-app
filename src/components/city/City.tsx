import "./City.css";
import { useEffect, useState } from "react";
import type { City as CityType } from "../../models/City";
import { weatherCodeMap, weatherIconMap, type currentWeather } from "../../models/Weather";

type Props = {
    city: CityType | null;
    onOpenModal: () => void;
};

function City({city, onOpenModal}: Props){
    /*const [isOpen, setIsOpen] = useState<boolean>(() => {
        const saved = localStorage.getItem("selectedCity");
        return saved ? false : true;
    });
    const [selectedCity, setSelectedCity] = useState<CityType | null>(() => {
        const saved = localStorage.getItem("selectedCity");
        return saved ? JSON.parse(saved) : null;
    });*/
    const [currentWeather, setCurrentWeather] = useState<currentWeather | null>(null);

    

    useEffect(() => {
        if(!city) return;
        async function fetchWeather() {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city?.latitude}&longitude=${city?.longitude}&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,weather_code&forecast_days=1`);
            const data = await response.json();
            setCurrentWeather(data);

            /*const now = new Date();
            const localTime = new Date(now.toLocaleString("en-US", {timeZone: selectedCity?.timezone}));
            const currentHourISO = localTime.toISOString().slice(0, 13);
            const index = data.hourly.time.findIndex((t: string) => t.startsWith(currentHourISO));

            if(index !== -1){
                setCurrentTemp(data.hourly.temperature_2m[index]);
                const code = data.hourly.weather_code[index];
                setWeatherCode(weatherCodeMap[code] || "Unknown");
            }*/
        }
        fetchWeather();
    }, [city]);


return (
    <>
        <div className="cityContainer">
            <div id="cityName" onClick={onOpenModal}>{city ? city.name : "Város neve"}</div>
            <div id="temperature">{currentWeather?.current.temperature_2m !== null ? `${currentWeather?.current.temperature_2m} °C` : ""}</div>
            <div id="minsmax">{currentWeather?.daily.temperature_2m_max + "°C / " + currentWeather?.daily.temperature_2m_min + "°C"}</div>
            <div id="weatherState">{currentWeather?.current.weather_code !== undefined ? weatherCodeMap[currentWeather?.current.weather_code] + " " + weatherIconMap[currentWeather?.current.weather_code] : ""}</div>
        </div>
    </>
)
}

export default City;
