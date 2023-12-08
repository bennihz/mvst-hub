import React from 'react'
import { Meta, Story } from '@storybook/react'
import RepositoryList from '../components/RepositoryList'
import { Repository } from '../types/global'

export default {
    title: 'RepositoryList',
    component: RepositoryList,
    argTypes: {
        onChange: { action: 'changed' },
    },
} as Meta

const repositories: Repository[] = [
    {
        id: 1,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
    {
        id: 2,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
    {
        id: 3,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
    {
        id: 4,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
    {
        id: 5,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
    {
        id: 7,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
    {
        id: 8,
        name: 'test',
        primaryLanguage: { name: 'C++' },
        description: 'test',
    },
]

const Template: Story = (args) => {
    return (
        <RepositoryList
            {...args}
            repositories={repositories}
            isLoading={false}
            darkMode={false}
        />
    )
}

export const Default = Template.bind({})
