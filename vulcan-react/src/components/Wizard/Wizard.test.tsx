import React from 'react';
import { create } from "react-test-renderer";
import Wizard from './Wizard';

describe('Wizard', () => {
   it('renders without error', () => {
      const component = create(<Wizard />);
      expect(component.toJSON()).toMatchSnapshot();
   });
});