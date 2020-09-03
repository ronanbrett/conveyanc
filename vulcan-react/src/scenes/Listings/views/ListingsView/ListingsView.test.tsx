import React from 'react';
import { render } from '@testing-library/react';
import ListingsView from './ListingsView';

describe('ListingsView', () => {
   it('renders without error', () => {
      const { asFragment } = render(<ListingsView />);
      expect(asFragment()).toMatchSnapshot();
   });
});