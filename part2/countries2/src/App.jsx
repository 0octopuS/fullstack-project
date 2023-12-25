// src/App.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import CountryInfo from './components/CountryInfo';

// 2.18 Country basic, list and detail
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://studies.cs.helsinki.fi/restcountries/api/all');
        const allCountries = response.data;

        if (filter.trim() === '') {
          setCountries([]);
          setSelectedCountry(null);
          setErrorMessage('');
        } else {
          const filteredCountries = allCountries.filter(
            (country) => country.name.common.toLowerCase().includes(
              filter.toLowerCase()));

          if (filteredCountries.length === 1) {
            setCountries([]);
            setSelectedCountry(filteredCountries[0]);
            setErrorMessage('');
          } else if (
            filteredCountries.length > 1 && filteredCountries.length <= 10) {
            setCountries(filteredCountries);
            setSelectedCountry(null);
            setErrorMessage('');
          } else {
            setCountries([]);
            setSelectedCountry(null);
            if (filteredCountries.length >= 10) {
              setErrorMessage('Too many matches, specify another filter.')
            } else {
              setErrorMessage('No match, specify another filter.')
            }
          }
        }
      } catch (error) {
        setCountries([]);
        setSelectedCountry(null);
        setErrorMessage('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, [filter]);

  const handleCountryClick = (alpha3Code) => {
    const country = countries.find((c) => c.cca3 === alpha3Code);
    setSelectedCountry(country);
  };

  const handleDetailsClick = (alpha3Code) => {
    const country = countries.find((c) => c.cca3 === alpha3Code);
    setSelectedCountry(country);
  };


  return (
    <div>
      <label>
        Find countries
        <input type='text' value={filter} onChange={
          (e) => setFilter(e.target.value)} />
      </label>
      <CountryInfo
        countries={countries}
        selectedCountry={selectedCountry}
        errorMessage={errorMessage}
        onCountryClick={handleCountryClick}
        onDetailsClick={handleDetailsClick}
      />
    </div>
  );
};

export default App;
