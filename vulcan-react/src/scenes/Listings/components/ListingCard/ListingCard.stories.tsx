import React from 'react';

import ListingCard from './ListingCard';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ListingCard',
  decorators: [],
  component: ListingCard,
};


export const Default = () => (
  <ListingCard></ListingCard>
);
