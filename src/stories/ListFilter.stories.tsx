import React from 'react'
import { Meta, Story } from '@storybook/react'
import ListFilter, { ListFilterProps } from '../components/ListFilter'

export default {
    title: 'ListFilter',
    component: ListFilter,
} as Meta

const Template: Story<ListFilterProps> = (args) => <ListFilter {...args} />

export const Default = Template.bind({})

Default.args = {
    onFilterChange: (nameFilter: string, languageFilter: string) => {
        console.log(nameFilter, languageFilter)
    },
}

Default.argTypes = {
    onFilterChange: { action: 'filter changed' },
}
