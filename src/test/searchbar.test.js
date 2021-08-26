import '@testing-library/jest-dom/extend-expect';
import { searchBarConfiguration } from '../configuration/constants';
import SearchBar from "../components/SearchBar";
import {
    cleanup,
    render,
    fireEvent
  } from '@testing-library/react';

  describe('Search bar test', () => {
    afterEach(cleanup);
      test('1. Searchbar component should be rendered correctly', () => {
          const handleManualSearch = jest.fn();
          const {
              container,
              getByPlaceholderText,
              getByTestId
          } = render(<SearchBar 
            params={[]}
            searchInput="ibm"
            handleSearch={handleManualSearch}
          />);

          expect(container).toMatchSnapshot();
          expect(getByPlaceholderText(searchBarConfiguration.placeholder))
            .toBeInTheDocument();
          expect(getByTestId('searchIcon')).toBeInTheDocument();
          fireEvent.click(getByTestId('searchIcon'));
          expect(handleManualSearch).toHaveBeenCalled();
      });
  });

