import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import Results from './Results';
import { stationsResponse } from '../data';

export default {
  title: 'Results',
  component: Results,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof Results>;

const Template: ComponentStory<typeof Results> = (args) => <Results {...args} />;

export const Default = Template.bind({});
Default.args = { list: stationsResponse, coordinates: { lat: 43.66235, lng: -79.38143 } };
