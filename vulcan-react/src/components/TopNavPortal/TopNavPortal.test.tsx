import React from 'react';
import { render } from '@testing-library/react';
import TopNavPortal from './TopNavPortal';

describe('TopNavPortal', () => {
   it('renders without error', () => {
      const { asFragment } = render(<TopNavPortal />);
      expect(asFragment()).toMatchSnapshot();
   });
});