import React from "react";
import PropTypes from 'prop-types';
import TextField from "../molecules/textfield";
import SearchIcon from '@material-ui/icons/Search';
import {searchBarConfiguration} from '../configuration/constants';


const SearchBar = ({
    handleSearch,
    params
}) => {
    return (
        <div className="search-bar-container">
           <TextField
             {...params}
             placeholder={searchBarConfiguration.placeholder}
             className={searchBarConfiguration.class}
             fullWidth
             autoFocus
             data-testid="searchBar"
           />
           <div className="icon">
            <SearchIcon
                data-testid="searchIcon"
                onClick={handleSearch}
                style={{cursor: "pointer"}}
            />
           </div>
        </div>
    );
};

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchBar;