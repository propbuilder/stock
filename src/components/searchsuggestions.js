import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SEARCH_ENDPOINT } from '../configuration/constants';
import SearchBar from './searchbar';

const SearchWithSuggestions = () => {
    // state to hold value which user enters
    const [inputValue, setInputValue] = useState('');

    // state to hold the available matching stocks
    const [matchingStocks, setMatchingStocks] = useState([]);

    // state to hold value which user selects
    const [value, setValue] = useState('');

    // state to control the suggestions panel
    const [openSuggestion, setOpenSuggestion] = useState(false);

    const handleSelection = (event, selectedValue) => {
        console.log('selected->', selectedValue);
        setValue(selectedValue);
    };

    const handleManualSearch = () => {
        console.log('search with-> ', inputValue);
    };

    const fetchSearchData = (searchSymbol) => {
        console.log('fetching data', searchSymbol);
        fetch(`${SEARCH_ENDPOINT}function=SYMBOL_SEARCH&keywords=${searchSymbol}&apikey=QSYIQ6FJDFZUSUFX`)
            .then((response) => response.json()
                .then((data) => {
                    setMatchingStocks(null)
                    setMatchingStocks(data.bestMatches)
                }))
            .catch((err) => console.log('something went wrong', err));
    };

    // below is a optimizer function which reduces the number of times api is called.
    const optimizeFetch = (method, delay) => {
        let timer;
        return (args) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                method(args);
            }, delay);
        }
    };

    const optimizedFetch = optimizeFetch(fetchSearchData, 5000);

    const handleInputChange = (event, newValue) => {
        setInputValue(newValue);
        if (newValue) {
            optimizedFetch(newValue);
        }
    };

    useEffect(() => {
        if (inputValue && matchingStocks && matchingStocks.length > 0) {
            setOpenSuggestion(true);
        } else {
            setOpenSuggestion(false);
        }
    }, [matchingStocks, inputValue]);

    const getMatchingStocks = () => {
        if (matchingStocks && matchingStocks.length > 0) {
            return matchingStocks.map((option) => {
                return option['1. symbol']
            });
        }
        return [];
    };

    return (
        <Autocomplete
        freeSolo
        autoComplete
        open={openSuggestion}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelection}
        id="autocomplete"
        disableClearable
        options={getMatchingStocks()}
        renderInput={(params) => (
          <SearchBar
            params={params}
            searchInput={inputValue}
            handleSearch={handleManualSearch}
          />
        )}
      />
    );
};

export default SearchWithSuggestions;