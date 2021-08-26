const SearchResult = ({
    stockDetails
}) => {
    return (
        <div className="search-result" data-testid="searchResult">
            <div className="detail">
                1. Name and Symbol of the company
                <div className="detail-content">{stockDetails.Name} {stockDetails.Symbol}</div>
            </div>
            <div className="detail">
                2. Description
                <div className="detail-content">{stockDetails.Description}</div>
            </div>
            <div className="detail">
                3. Current Price
                <div className="detail-content">{stockDetails.AnalystTargetPrice}</div>
            </div>
            <div className="detail">
                4. Change its traded on
                <div className="detail-content">{stockDetails.Beta}</div>
            </div>
            <div className="detail">
                5. Industry
                <div className="detail-content">{stockDetails.Industry}</div>
            </div>
            <div className="detail">
                6. PE Ratio
                <div className="detail-content">{stockDetails.PERatio}</div>
            </div>
            <div className="detail">
                7. Market Cap
                <div className="detail-content">{stockDetails.MarketCapitalization}</div>
            </div>
        </div>
    );
};

export default SearchResult;