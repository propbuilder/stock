import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import SearchBar from './searchbar';

const SearchWithSuggestions = ({
    optimizedFetch,
    matchingStocks,
    fetchStockData,
    setMatchingStocks,
    setStockDetails
}) => {
    // state to hold value which user enters
    const [inputValue, setInputValue] = useState('');

    // state to control the suggestions panel
    const [openSuggestion, setOpenSuggestion] = useState(false);

    // Fires when user selects one of the suggestions.
    const handleSelection = (event, selectedValue) => {
        event.preventDefault();
        console.log('selection', selectedValue);
        setOpenSuggestion(false);
        if (selectedValue) {
            fetchStockData(selectedValue);
        }
    };

    // Fires when user doesn't select any suggested option but 
    // go ahead and searches manually by clicking on search button.
    const handleManualSearch = () => {
        setMatchingStocks(null);
        if (inputValue) {
            fetchStockData(inputValue);
        }
    };

    // takes care of input change as user types in.
    const handleInputChange = (event, newValue) => {
        console.log('inputchange', newValue);
        setStockDetails('');
        setInputValue(newValue);
        if (newValue && !matchingStocks) {
            optimizedFetch(newValue);
        } else {
            setStockDetails('');
            setMatchingStocks(null);
            setOpenSuggestion(false);
        }
    };

    // Show the suggestions once we have the data
    useEffect(() => {
        if (inputValue && matchingStocks && matchingStocks.length > 0) {
            setOpenSuggestion(true);
        } else {
            setOpenSuggestion(false);
        }
    }, [matchingStocks, inputValue]);

    // Format the response data for suggestion panel.
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
        // blurOnSelect
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

SearchWithSuggestions.propTypes = {
    optimizedFetch: PropTypes.func.isRequired,
    matchingStocks: PropTypes.arrayOf(PropTypes.shape).isRequired,
    fetchStockData: PropTypes.func.isRequired
};

export default SearchWithSuggestions;