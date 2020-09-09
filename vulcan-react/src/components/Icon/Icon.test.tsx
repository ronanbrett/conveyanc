import React from 'react';
import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
   it('renders without error', () => {
      const { asFragment } = render(<Icon />);
      expect(asFragment()).toMatchSnapshot();
   });
});