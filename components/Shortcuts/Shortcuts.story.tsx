import { ComponentStory, ComponentMeta } from '@storybook/react';
import Shortcuts from './Shortcuts';

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
  },
};
