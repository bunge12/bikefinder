import { ComponentStory, ComponentMeta } from '@storybook/react';
import Shortcuts from './Shortcuts';

export default {
  title: 'Shortcuts',
  component: Shortcuts,
} as ComponentMeta<typeof Shortcuts>;

const Template: ComponentStory<typeof Shortcuts> = () => <Shortcuts />;

export const Default = Template.bind({});
Default.args = {};
