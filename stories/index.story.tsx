import { ComponentStory, ComponentMeta } from '@storybook/react';
import HomePage from '../pages/index';
import { rest } from 'msw';
import { stationsResponse } from '../components/data';

export default {
  title: 'Pages/HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => <HomePage />;
export const Default = Template.bind({});
Default.parameters = {
  msw: [
    rest.post('api/bikeshare', (req, res, ctx) => res(ctx.delay(2000), ctx.json(stationsResponse))),
  ],
};
