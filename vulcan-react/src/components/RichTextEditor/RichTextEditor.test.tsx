import React from 'react';
import { render } from '@testing-library/react';
import RichTextEditor from './RichTextEditor';

describe('RichTextEditor', () => {
   it('renders without error', () => {
      const { asFragment } = render(<RichTextEditor />);
      expect(asFragment()).toMatchSnapshot();
   });
});