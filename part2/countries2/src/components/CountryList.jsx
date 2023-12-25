// src/components/CountryList.js
import React from 'react';

const CountryList = ({countries, onCountryClick, onDetailsClick}) => {
    // 2.19 add show button
    return (
        <ul>
            {countries.map((country) => (
                <li key={country.cca3} onClick={() => onCountryClick(country.cca3)}>
                    {country.name.common}
                    <button onClick={() => onDetailsClick(country.cca3)}>show</button>
                </li>
            ))}
        </ul>
    );
};

export default CountryList;
