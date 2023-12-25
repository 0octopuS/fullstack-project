// src/components/CountryDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                console.log(import.meta.env);
                const apiKey = import.meta.env.VITE_SOME_KEY;
                console.log('API Key:', apiKey);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${apiKey}`
                );
                setWeather(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeather(null);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [country.capital]);

    const convertToCelsius = (k) => (k - 273.15).toFixed(2);
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} sq km</p>
            <div>
                Languages:
                <ul>
                    {Object.entries(country.languages).map(([code, name]) => (
                        <li key={code}>{name}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flags.png} alt={`${country.name.common} Flag`} style={{ width: '200px', height: 'auto' }} />

            {weather && (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temperature: {convertToCelsius(weather.main.temp)} Celsius</p>
                    {weather.weather && (
                        <div>
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt="Weather Icon"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <p>Weather: {weather.weather[0].description}</p>
                        </div>
                    )}
                    <p>Wind: {weather.wind.speed} m/s</p>
                </div>
            )}

            {loading && <p>Loading weather information...</p>}
        </div>);
};

export default CountryDetail;
