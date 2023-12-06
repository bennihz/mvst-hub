import React from 'react'
import { Meta, Story } from '@storybook/react'
import Dropdown from '../components/Dropdown'

export default {
    title: 'Dropdown',
    component: Dropdown,
    argTypes: {
        onChange: { action: 'changed' },
    },
} as Meta

const navigationItems = [
    { linkName: 'C++' },
    { linkName: 'Java' },
    { linkName: 'TypeScript' },
    { linkName: 'Not specified' },
]

const Template: Story = (args) => {
    return <Dropdown {...args} navigationItems={navigationItems} />
}

export const Default = Template.bind({})
