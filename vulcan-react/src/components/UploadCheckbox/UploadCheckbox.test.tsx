import React from 'react';
import { create } from "react-test-renderer";
import UploadCheckbox from './UploadCheckbox';

describe('UploadCheckbox', () => {
   it('renders without error', () => {
      const component = create(<UploadCheckbox />);
      expect(component.toJSON()).toMatchSnapshot();
   });
});