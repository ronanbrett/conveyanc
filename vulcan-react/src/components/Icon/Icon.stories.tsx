import React from 'react';

import Icon from './Icon';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Icon',
  decorators: [],
  component: Icon,
};


export const Default = (props) => (
  <Icon {...props}></Icon>
);
