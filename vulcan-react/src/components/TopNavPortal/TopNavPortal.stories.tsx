import React from 'react';

import TopNavPortal from './TopNavPortal';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/TopNavPortal',
  decorators: [],
  component: TopNavPortal,
};


export const Default = () => (
  <TopNavPortal></TopNavPortal>
);
