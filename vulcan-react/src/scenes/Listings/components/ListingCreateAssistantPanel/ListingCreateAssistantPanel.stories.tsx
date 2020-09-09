import React from 'react';

import ListingCreateAssistantPanel from './ListingCreateAssistantPanel';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ListingCreateAssistantPanel',
  decorators: [],
  component: ListingCreateAssistantPanel,
};


export const Default = (props) => (
  <ListingCreateAssistantPanel {...props}></ListingCreateAssistantPanel>
);
