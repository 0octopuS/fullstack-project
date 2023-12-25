// src/components/CountryInfo.js
import React from 'react';

import CountryDetail from './CountryDetail';
import CountryList from './CountryList';
import ErrorMessage from './ErrorMessage';


const CountryInfo = ({
  countries,
  selectedCountry,
  errorMessage,
  onCountryClick,
  onDetailsClick
}) => {
        if (errorMessage) {
            return <ErrorMessage message={errorMessage} />;
        }

        if (countries.length > 10) {
            return <p>Too many matches, specify another filter.</p>;
        }

        if (selectedCountry) {
            return <CountryDetail country={selectedCountry} />;
        }

        return <CountryList countries={countries} onCountryClick={onCountryClick} onDetailsClick={onDetailsClick} />;
    };

export default CountryInfo;
