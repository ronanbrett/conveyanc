import React from 'react';

import Button from './Button';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Button',
  decorators: [],
  component: Button,
};


export const Default = () => (
  <Button></Button>
);
