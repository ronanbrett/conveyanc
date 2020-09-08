import React from 'react';
import { render } from '@testing-library/react';
import Drop from './Drop';

describe('Drop', () => {
   it('renders without error', () => {
      const { asFragment } = render(<Drop />);
      expect(asFragment()).toMatchSnapshot();
   });
});