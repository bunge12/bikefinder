import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import Address from './Address';
import { apiResponse } from '../data';

export default {
  title: 'Address',
  component: Address,
  argTypes: { onSave: { action: 'clicked' }, onRefresh: { action: 'clicked' } },
} as ComponentMeta<typeof Address>;

const Template: ComponentStory<typeof Address> = (args) => <Address {...args} />;
export const Default = Template.bind({});
Default.parameters = {
  msw: [rest.get('https://api.mapbox.com/*', (req, res, ctx) => res(ctx.json(apiResponse)))],
};

export const NoButtons = Template.bind({});
NoButtons.args = {
  hideControls: true,
};
NoButtons.parameters = {
  msw: [rest.get('https://api.mapbox.com/*', (req, res, ctx) => res(ctx.json(apiResponse)))],
};
