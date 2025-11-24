import "./Forecast.css";
import type { City } from "../../models/City";
import { useEffect, useState } from "react";
import { type weatherForcast, dayNames, weatherIconMap } from "../../models/Weather";

type Props = {
    city: City | null;
};

function Forecast({city}: Props){
    const [weatherForcast, setWeatherForcast] = useState<weatherForcast | null>(null);

    useEffect(() => {
        if(!city) return;
        async function fetchWeather(){
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city?.latitude}&longitude=${city?.longitude}&daily=precipitation_probability_mean,temperature_2m_max,temperature_2m_min,weather_code&forecast_days=8`);
            const data = await response.json();
            setWeatherForcast(data);
        }
        fetchWeather();
    }, [city]);


    return(
        <div className="container">
            <div>7 napos előrejelzés</div>
            <div className="forecast-container">
                {weatherForcast?.daily.time?.slice(1).map((dateString, index) => {
                    const date = new Date(dateString);
                    const dayIndex = date.getDay();
                    const dayName = dayNames[dayIndex];
                    return (
                        <div>
                            <div>{dayName}</div>
                            <div>{weatherIconMap[weatherForcast.daily.weather_code[index]]}</div>
                            <div>{weatherForcast.daily.precipitation_probability_mean[index] + "%"}</div>
                            <div>{weatherForcast.daily.temperature_2m_max[index] + "°C / " + weatherForcast.daily.temperature_2m_min[index] + "°C"}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Forecast;