import "./Chart.css";
import type { City } from "../../models/City";
import { type weatherChart, dayNames } from "../../models/Weather";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
    city: City | null;
};

function Chart({city}: Props){
    const [weather, setWeather] = useState<weatherChart | null>(null);

    useEffect(() => {
        if(!city) return;
        async function fetchWeather(){
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city?.latitude}&longitude=${city?.longitude}&daily=temperature_2m_max&forecast_days=8`);
            const data = await response.json();
            setWeather(data);
        }
        fetchWeather();
    }, [city]);

    const chartData = weather?.daily.time.slice(1).map((dateString, index) => {
        const date = new Date(dateString);
        return {
            day: dayNames[date.getDay()],
            maxTemp: weather.daily.temperature_2m_max[index]
        };
    });



    return(
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{top: 20, right: 30, left: 0, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="day" stroke="white"/>
                <YAxis unit="°C" stroke="white"/>
                <Tooltip/>
                <Line type="monotone" name="Maximum hőmérséklet" dataKey="maxTemp" stroke="#ff7300" strokeWidth={2}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;