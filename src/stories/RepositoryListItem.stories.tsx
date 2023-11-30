import React from 'react';
import { Meta, Story } from '@storybook/react';
import RepositoryListItem, { RepositoryListItemProps } from '../components/RepositoryListItem';

export default {
    title: 'RepositoryListItem',
    component: RepositoryListItem,
} as Meta;

const Template: Story<RepositoryListItemProps> = (args) => <RepositoryListItem {...args} />;

export const Default = Template.bind({});

Default.args = {
    repository: {
        id: 4,
        name: 'repository name',
        language: 'C++',
    }
};

export const Loading = Template.bind({});

Loading.args = {
    isLoading: true,
};