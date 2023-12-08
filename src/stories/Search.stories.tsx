import React from 'react'
import { Meta, Story } from '@storybook/react'
import Search from '../components/Search'

export default {
    title: 'SearchRepo',
    component: Search,
    argTypes: {
        onChange: { action: 'changed' },
    },
} as Meta

const Template: Story = (args) => {
    const [value, setValue] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <Search
            onSearch={args.onSearch}
            placeholder="Search here"
            disabled={false}
            username="username"
        />
    )
}

export const Default = Template.bind({})
