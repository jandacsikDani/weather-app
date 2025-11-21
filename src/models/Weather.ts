type Weather = {
    latitude: number;
    longitude: number;
    timezone: string;
};

/*type HourlyUnits = {
    time: string;
    temperature_2m: number;
    weather_code: string;
};

type HourlyData = {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
};*/

export type currentWeather = Weather & {
    current: {
        time: string,
        temperature_2m: number,
        weather_code: number
    },
    daily:{
        time: string[],
        temperature_2m_max: number[],
        temperature_2m_min: number[]
    }
};

export type weatherForcast = Weather & {
    daily:{
        time: string[],
        precipitation_probability_mean: number[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
        weather_code: number[]
    }
};

export type weatherChart = Weather & {
    daily:{
        time: string[],
        temperature_2m_max: number[]
    }
};

export const weatherCodeMap: Record<number, string> = {
    0: "Derült égbolt",
    1: "Többnyire derült",
    2: "Részben felhős",
    3: "Borult",
    45: "Köd",
    48: "Zúzmarás köd",
    51: "Gyenge szitálás",
    53: "Mérsékelt szitálás",
    55: "Erős szitálás",
    56: "Gyenge ónos szitálás",
    57: "Erős ónos szitálás",
    61: "Enyhe eső",
    63: "Mérsékelt eső",
    65: "Heves eső",
    66: "Gyenge ónos eső",
    67: "Heves ónos eső",
    71: "Gyenge havazás",
    73: "Mérsékelt havazás",
    75: "Erős havazás",
    77: "Hószemcsék",
    80: "Gyenge zápor",
    81: "Mérsékelt zápor",
    82: "Heves zápor",
    85: "Gyenge hózápor",
    86: "Erős hózápor",
    95: "Gyenge vagy mérsékelt zivatar",
    96: "Zivatar kis jéggel",
    99: "Zivatar nagy jéggel"
};

export const weatherIconMap: Record<number, string> = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌧️",
    55: "🌧️",
    61: "🌦️",
    63: "🌧️",
    65: "🌧️",
    66: "🌧️❄️",
    67: "🌧️❄️",
    71: "🌨️",
    73: "🌨️",
    75: "❄️",
    77: "❄️",
    80: "🌦️",
    81: "🌧️",
    82: "🌧️⛈️",
    85: "🌨️",
    86: "❄️",
    95: "⛈️",
    96: "⛈️🌨️",
    99: "⛈️❄️"
};

export const dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];