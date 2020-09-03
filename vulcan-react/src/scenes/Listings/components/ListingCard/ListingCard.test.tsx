import React from 'react';
import { render } from '@testing-library/react';
import ListingCard from './ListingCard';

describe('ListingCard', () => {
   it('renders without error', () => {
      const { asFragment } = render(<ListingCard />);
      expect(asFragment()).toMatchSnapshot();
   });
});