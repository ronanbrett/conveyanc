import React from 'react';

import CurrencyInput from './CurrencyInput';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/CurrencyInput',
  decorators: [],
  component: CurrencyInput,
};


export const Default = (props) => (
  <CurrencyInput {...props}></CurrencyInput>
);
