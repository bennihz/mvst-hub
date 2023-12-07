import React from 'react'
import { Meta, Story } from '@storybook/react'
import Navbar, { NavbarProps } from '../components/Navbar'

export default {
    title: 'Navbar',
    component: Navbar,
    argTypes: {
        onDarkModeToggle: { action: 'toggled' },
    },
} as Meta

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />

export const Default = Template.bind({})
