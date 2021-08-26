import '@testing-library/jest-dom/extend-expect';
import Header from "../components/Header";
import {
    cleanup,
    render
  } from '@testing-library/react';

  describe('Header component test', () => {
    afterEach(cleanup);
      test('1. Header component should render correctly', () => {
          const { container } = render(
              <Header />
          );
          expect(container).toMatchSnapshot();
      });
  });
