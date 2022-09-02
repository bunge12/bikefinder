import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import Header from './Header';
import { apiResponse } from '../data';

export default {
  title: 'Header',
  component: Header,
  argTypes: { onSave: { action: 'clicked' } },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: [rest.get('https://api.mapbox.com/*', (req, res, ctx) => res(ctx.json(apiResponse)))],
};
