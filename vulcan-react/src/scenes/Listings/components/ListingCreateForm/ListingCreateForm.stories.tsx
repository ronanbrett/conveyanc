import React from 'react';

import ListingCreateForm from './ListingCreateForm';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ListingCreateForm',
  decorators: [],
  component: ListingCreateForm,
};


export const Default = () => (
  <ListingCreateForm></ListingCreateForm>
);
