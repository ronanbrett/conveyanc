import React from 'react';
import { render } from '@testing-library/react';
import InfiniteScroll from './InfiniteScroll';

const simpleItems = (value: any) =>
  Array(value)
    .fill(0)
    .map((_, i) => `item ${i + 1}`);

const createPageItems = (allChildren: any) => {
  const unfiltered = Array.from(allChildren);
  // Removing any children which are serving as refs
  return unfiltered.filter((childItem: any) => childItem.outerHTML.includes('item'));
};



// describe('InfiniteScroll', () => {
//    it('renders without error', () => {
//       const { asFragment } = render(<InfiniteScroll />);
//       expect(asFragment()).toMatchSnapshot();
//    });
// });