import React from 'react';

import Select from './Select';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Select',
  decorators: [],
  component: Select,
};


export const Default = (props) => (
  <Select {...props}></Select>
);
