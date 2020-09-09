import React from 'react';

import RichTextEditor from './RichTextEditor';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/RichTextEditor',
  decorators: [],
  component: RichTextEditor,
};


export const Default = (props) => (
  <RichTextEditor {...props}></RichTextEditor>
);
