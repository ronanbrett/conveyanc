import React from 'react';

import ListingsCreateView from './ListingsCreateView';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ListingsCreateView',
  decorators: [],
  component: ListingsCreateView,
};


export const Default = () => (
  <ListingsCreateView></ListingsCreateView>
);
