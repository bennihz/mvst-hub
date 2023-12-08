import React from 'react'
import { Meta, Story } from '@storybook/react'
import Error, { ErrorProps } from '../components/Error'

export default {
    title: 'Error',
    component: Error,
} as Meta

const Template: Story<ErrorProps> = (args) => {
    return <Error {...args} />
}

export const Default = Template.bind({})

Default.args = {
    message: 'There was an error',
}
