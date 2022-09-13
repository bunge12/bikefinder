import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import Shortcuts from './Shortcuts';
import { apiResponse } from '../data';

export default {
  title: 'Shortcuts',
  component: Shortcuts,
  argTypes: { onSearch: { action: 'clicked' } },
} as ComponentMeta<typeof Shortcuts>;

const Template: ComponentStory<typeof Shortcuts> = (args) => <Shortcuts {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchQuery: {
    stations: 5,
    quantity: 1,
    item: '',
    lat: null,
    lng: null,
  },
};
Default.parameters = {
  msw: [rest.get('https://api.mapbox.com/*', (req, res, ctx) => res(ctx.json(apiResponse)))],
};
