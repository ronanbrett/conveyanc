import React from 'react';

import ImageUploader from './ImageUploader';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ImageUploader',
  decorators: [],
  component: ImageUploader,
};


export const Default = (props) => (
  <ImageUploader {...props}></ImageUploader>
);
