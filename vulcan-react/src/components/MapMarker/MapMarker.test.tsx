import React from 'react';
import { render } from '@testing-library/react';
import MapMarker from './MapMarker';

describe('MapMarker', () => {
   it('renders without error', () => {
      const { asFragment } = render(<MapMarker />);
      expect(asFragment()).toMatchSnapshot();
   });
});