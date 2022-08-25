import { ComponentStory, ComponentMeta } from '@storybook/react';
import Search from './Search';

export default {
  title: 'Search',
  component: Search,
  argTypes: { onSearch: { action: 'clicked' } },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {};
