import React from 'react';
import { create } from "react-test-renderer";
import Progress from './Progress';

describe('Progress', () => {
   it('renders without error', () => {
      const component = create(<Progress />);
      expect(component.toJSON()).toMatchSnapshot();
   });
});