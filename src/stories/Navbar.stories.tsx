import React from 'react'
import { Meta, Story } from '@storybook/react'
import Navbar from '../components/Navbar'

export default {
    title: 'Navbar',
    component: Navbar,
} as Meta

const Template: Story = () => <Navbar />

export const Default = Template.bind({})
