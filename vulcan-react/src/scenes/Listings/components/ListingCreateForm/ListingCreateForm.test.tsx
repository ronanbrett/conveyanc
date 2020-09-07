import React from 'react';
import { render } from '@testing-library/react';
import ListingCreateForm from './ListingCreateForm';

describe('ListingCreateForm', () => {
   it('renders without error', () => {
      const { asFragment } = render(<ListingCreateForm />);
      expect(asFragment()).toMatchSnapshot();
   });
});