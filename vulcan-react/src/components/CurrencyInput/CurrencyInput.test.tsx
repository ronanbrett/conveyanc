import React from 'react';
import { create } from "react-test-renderer";
import CurrencyInput from './CurrencyInput';

describe('CurrencyInput', () => {
   it('renders without error', () => {
      const component = create(<CurrencyInput />);
      expect(component.toJSON()).toMatchSnapshot();
   });
});