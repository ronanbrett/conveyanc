import React from 'react';

import MultiTierDropdown from './MultiTierDropdown';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/MultiTierDropdown',
  decorators: [],
  component: MultiTierDropdown,
};


export const Default = (props) => (
  <MultiTierDropdown {...props}></MultiTierDropdown>
);
