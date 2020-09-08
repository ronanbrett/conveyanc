import React from 'react';
import { cleanup, render } from '@testing-library/react';
import TopNavPortal from './TopNavPortal';


const generatePortal =  () => {
   let modalRoot = document.createElement("div");
   modalRoot.setAttribute("id", "topNavPortal");
   document.querySelector("body")!.appendChild(modalRoot);
}


describe('TopNavPortal', () => {

   beforeEach(generatePortal);

   afterEach(cleanup);

   it('renders without error', () => {
      const { asFragment } = render(<TopNavPortal></TopNavPortal>);
      expect(asFragment()).toMatchSnapshot();
   });
});