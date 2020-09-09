import React from 'react';
import { render } from '@testing-library/react';
import ListingCreateAssistantPanel from './ListingCreateAssistantPanel';

describe('ListingCreateAssistantPanel', () => {
   it('renders without error', () => {
      const { asFragment } = render(<ListingCreateAssistantPanel />);
      expect(asFragment()).toMatchSnapshot();
   });
});