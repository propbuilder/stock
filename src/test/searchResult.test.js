import '@testing-library/jest-dom/extend-expect';
import SearchResult from "../components/searchResult";
import {
    cleanup,
    render
  } from '@testing-library/react';

describe('Search result test', () => {
    afterEach(cleanup);
    test('1. search result component should render properly', () => {
        const mockStockDetails = {
            Name: 'International Business Machines',
            Symbol: 'IBM',
            Description: 'Product org.',
            AnalystTargetPrice: '2.23',
            Beta: '11.1',
            Industry: 'Computers',
            PERatio: '12.2',
            MarketCapitalization: '123345'
        };
        const { container, getByText } = render(
            <SearchResult 
                stockDetails={mockStockDetails}
            />
        );
        expect(container).toMatchSnapshot();
        expect(getByText('Computers')).toBeInTheDocument();
        expect(getByText('Product org.')).toBeInTheDocument();
    });
});