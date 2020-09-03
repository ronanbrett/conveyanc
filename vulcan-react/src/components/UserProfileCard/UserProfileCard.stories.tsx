import React from 'react';

import UserProfileCard from './UserProfileCard';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/UserProfileCard',
  decorators: [],
  component: UserProfileCard,
};


export const Default = () => (
  <UserProfileCard></UserProfileCard>
);
