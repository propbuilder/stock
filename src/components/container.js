import React, {useState} from 'react';
import './styles.css';
import Header from './Header';
import SearchWithSuggestions from './searchsuggestions';
import SearchResult from './searchResult';
import { 
    SEARCH_ENDPOINT,
    OVERVIEW_ENDPOINT,
    API_KEY,
    optimizationDelay
} from '../configuration/constants';

const Container = () => {
    // state to hold the available matching stocks
    const [matchingStocks, setMatchingStocks] = useState([]);

    // state to hold stock details.
    const [stockDetails, setStockDetails] = useState('');

    /**
     * Below method will call the api to get search items.
     * @param {*} searchSymbol - input search string
     */
    const fetchSearchData = (searchSymbol) => {
        console.log('fetching data', searchSymbol);
        fetch(`${SEARCH_ENDPOINT}function=SYMBOL_SEARCH&keywords=${searchSymbol}&apikey=${API_KEY}`)
            .then((response) => response.json()
                .then((data) => {
                    setMatchingStocks(null)
                    setMatchingStocks(data.bestMatches)
                }))
            .catch((err) => console.log('something went wrong', err));
    };

    const fetchStockData = (selectedSymbol) => {
        fetch(`${OVERVIEW_ENDPOINT}function=OVERVIEW&symbol=${selectedSymbol}&apikey=${API_KEY}`)
            .then((response) => response.json()
                .then(data => setStockDetails(data))
            )
            .catch(err => console.log('something went wrong getting overview', err));
    };

    /**
     * Below is a optimizer function which reduces the number of times api is called.
     * The api call would only happen once user stops typing.
     * @param {*} method - method to be called
     * @param {*} delay - delay in milliseconds
     * @returns 
     */
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

    const optimizedFetch = optimizeFetch(fetchSearchData, optimizationDelay);


    return (
        <div className="parent-container">
           <Header />
           <SearchWithSuggestions 
                optimizedFetch={optimizedFetch}
                matchingStocks={matchingStocks}
                setMatchingStocks={setMatchingStocks}
                fetchStockData={fetchStockData}
                setStockDetails={setStockDetails}
           />
           {stockDetails && 
            <SearchResult 
                stockDetails={stockDetails}
            />
           }
        </div>
    );
};

export default Container;