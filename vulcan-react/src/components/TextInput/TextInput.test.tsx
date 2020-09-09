import React from 'react';
import { render } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
   it('renders without error', () => {
      const { asFragment } = render(<TextInput />);
      expect(asFragment()).toMatchSnapshot();
   });
});