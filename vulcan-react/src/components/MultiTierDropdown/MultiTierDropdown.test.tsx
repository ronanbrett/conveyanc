import React from 'react';
import { render } from '@testing-library/react';
import MultiTierDropdown from './MultiTierDropdown';

describe('MultiTierDropdown', () => {
   it('renders without error', () => {
      const { asFragment } = render(<MultiTierDropdown />);
      expect(asFragment()).toMatchSnapshot();
   });
});