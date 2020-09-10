import React from 'react';
import { render } from '@testing-library/react';
import ImageUploader from './ImageUploader';

describe('ImageUploader', () => {
   it('renders without error', () => {
      const { asFragment } = render(<ImageUploader />);
      expect(asFragment()).toMatchSnapshot();
   });
});