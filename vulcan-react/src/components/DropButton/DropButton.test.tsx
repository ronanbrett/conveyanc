import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import DropButton from "./DropButton";
import { create } from "react-test-renderer";


import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import { createPortal, expectPortal } from "@core/utils/portal.utils";
describe("DropButton", () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test("should have no accessibility violations", async () => {
    const { container } = render(
      <DropButton
        a11yTitle="test"
        dropContent={<div id="drop-contents">drop contents</div>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("closed", () => {
    const component = create(
      <DropButton
        label="Dropper"
        dropContent={<div id="drop-contents">drop contents</div>}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("opened", () => {
    const component = create(
      <DropButton
        id="123"
        open={true}
        dropContent={<div id="drop-contents">drop contents</div>}>
           Dropper
           </DropButton>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('open and close', () => {
   window.scrollTo = jest.fn();
   const { getByText, container } = render(
     <DropButton
       dropContent={<div id="drop-contents">Drop Contents</div>}>
          Dropper
       </DropButton>,
   );
   expect(container.firstChild).toMatchSnapshot();
   expect(document.getElementById('drop-contents')).toBeNull();

   fireEvent.click(getByText('Dropper'));
   expectPortal('drop-contents').toMatchSnapshot();

   fireEvent.click(getByText('Dropper'));
   expect(document.getElementById('drop-contents')).toBeNull();
   expect(window.scrollTo).toBeCalled();
 });

 test('close by clicking outside', done => {
   const { getByText, container } = render(
     <DropButton
       dropContent={<div id="drop-contents">Drop Contents</div>}
     >Dropper</DropButton>,
   );
   expect(container.firstChild).toMatchSnapshot();
   expect(document.getElementById('drop-contents')).toBeNull();

   fireEvent.click(getByText('Dropper'));
   expectPortal('drop-contents').toMatchSnapshot();

   fireEvent(
     document,
     new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
   );

   setTimeout(() => {
     expect(document.getElementById('drop-contents')).toBeNull();
     done();
   }, 50);
 });

 test('disabled', () => {
   const { getByText, container } = render(
     <DropButton
       disabled
       dropContent={<div id="drop-contents">Drop Contents</div>}
     >Dropper</DropButton>,
   );
   expect(container.firstChild).toMatchSnapshot();
   expect(document.getElementById('drop-contents')).toBeNull();

   fireEvent.click(getByText('Dropper'));
   expect(document.getElementById('drop-contents')).toBeNull();
 });

 test('opened ref', () => {
   const ref = React.createRef();
   const { container } = render(
     <DropButton
       ref={ref}
       open
       dropContent={<div id="drop-contents">Drop Contents</div>}
     >Dropper</DropButton>,
   );
   expect(container.firstChild).toMatchSnapshot();
   expectPortal('drop-contents').toMatchSnapshot();
 });

 test('ref function', () => {
   const ref = jest.fn();
   const { container } = render(
     <DropButton
       ref={ref}
       open
       dropContent={<div id="drop-contents">Drop Contents</div>}
     >Dropper</DropButton>,
   );
   expect(container.firstChild).toMatchSnapshot();
   expect(ref).toBeCalled();
   expectPortal('drop-contents').toMatchSnapshot();
 });

});
