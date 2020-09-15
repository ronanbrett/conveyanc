import React from 'react';

import Wizard from './Wizard';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Wizard',
  decorators: [],
  component: Wizard,
};


export const Default = (props) => (
  <Wizard {...props}></Wizard>
);
