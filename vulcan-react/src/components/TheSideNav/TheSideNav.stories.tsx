import React from 'react';

import TheSideNav from './TheSideNav';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/TheSideNav',
  decorators: [],
  component: TheSideNav,
};


export const Default = () => (
  <TheSideNav></TheSideNav>
);
