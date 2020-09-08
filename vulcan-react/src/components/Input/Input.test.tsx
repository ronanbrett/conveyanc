import React from 'react';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Input from './Input';
import { Field, Form, Formik } from 'formik';




describe('Input', () => {
   it('renders without error', () => {
      const component = create(
         <Formik
            initialValues={{ propertyType: "TestC" }}
            onSubmit={(x) => console.log(x)}
         >
            <Form>
               <label htmlFor="propertyType">Property Type</label>
               <Input id="name" name="name" placeholder="John" />
            </Form>
         </Formik>
      )

      expect(component).toMatchSnapshot();
   });
});