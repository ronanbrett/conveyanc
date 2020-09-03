import React from 'react';
import { render } from '@testing-library/react';
import ListingsCreateView from './ListingsCreateView';

describe('ListingsCreateView', () => {
   it('renders without error', () => {
      const { asFragment } = render(<ListingsCreateView />);
      expect(asFragment()).toMatchSnapshot();
   });
});