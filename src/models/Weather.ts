export type Weather = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: HourlyUnits;
    hourly: HourlyData;
};

type HourlyUnits = {
    time: string[];
    temperature_2m: string;
};

type HourlyData = {
    time: string[];
    temperature_2m: string;
};