import React from 'react';
import { render } from '@testing-library/react';
import Keyboard from './Keyboard';

describe('Keyboard', () => {
   it('renders without error', () => {
      const { asFragment } = render(<Keyboard />);
      expect(asFragment()).toMatchSnapshot();
   });
});