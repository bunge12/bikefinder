import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '@mantine/core';
import Results from './Results';

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

const Template: ComponentStory<typeof Results> = () => <Results />;

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
