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

    // state to hold info if we need to show not found
    const [notFound, setNotFound] = useState(false);

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

    /**
     * Below method calls api to get the stock details
     * @param {*} selectedSymbol - selected stock symbol
     */
    const fetchStockData = (selectedSymbol) => {
        fetch(`${OVERVIEW_ENDPOINT}function=OVERVIEW&symbol=${selectedSymbol}&apikey=${API_KEY}`)
            .then((response) => response.json()
                .then(data => {
                    if (data && Object.keys(data).length > 0) {
                        setStockDetails(data);
                        setNotFound(false);
                    } else {
                        setNotFound(true);
                    }
                })
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
                setNotFound={setNotFound}
           />
           {stockDetails && (Object.keys(stockDetails).length > 0) &&
                <SearchResult 
                    stockDetails={stockDetails}
                />
            }
            {
                notFound && <div className="not-found">Not Found</div>
            }
        </div>
    );
};

export default Container;