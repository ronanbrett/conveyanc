import React from 'react';
import { render } from '@testing-library/react';
import AddressGeocodeSearch from './AddressGeocodeSearch';

describe('AddressGeocodeSearch', () => {
   it('renders without error', () => {
      const { asFragment } = render(<AddressGeocodeSearch />);
      expect(asFragment()).toMatchSnapshot();
   });
});