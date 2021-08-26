import React, {useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { top100Films } from '../configuration/constants';
import SearchBar from './searchbar';

const SearchWithSuggestions = () => {
    // value which user enters
    const [inputValue, setInputValue] = useState('');

    // value which user selects
    const [value, setValue] = useState('');
    const [openSuggestion, setOpenSuggestion] = useState(false);

    const handleSelection = (event, selectedValue) => {
        console.log('selected->', selectedValue);
        setValue(selectedValue);
    };

    const handleManualSearch = () => {
        console.log('search with-> ', inputValue);
    };

    const handleInputChange = (event, newValue) => {
        setInputValue(newValue);
        if (newValue && !openSuggestion) {
            setOpenSuggestion(true);
        } else {
            setOpenSuggestion(false);
        }
    };
    return (
        <Autocomplete
        freeSolo
        open={openSuggestion}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelection}
        id="autocomplete"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <SearchBar
            handleSearch={() => {}}
            params={params}
            searchInput={inputValue}
            handleSearch={handleManualSearch}
          />
        )}
      />
    );
};

export default SearchWithSuggestions;