import React from 'react'
import { Meta, Story } from '@storybook/react'
import SearchBarBig, { SearchBarBigProps } from '../components/SearchBarBig'

export default {
    title: 'SearchBarBig',
    component: SearchBarBig,
    argTypes: {
        onSearch: { action: 'searched' },
    },
} as Meta

const Template: Story<SearchBarBigProps> = (args) => {
    const [value, setValue] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return <SearchBarBig onSearch={args.onSearch} />
}

export const Default = Template.bind({})
