import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button, { ButtonProps } from '../components/common/Button';

export default {
    title: 'Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Click me',
    onClick: action('clicked'),
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Click me',
    variant: 'secondary',
    onClick: action('clicked'),
};