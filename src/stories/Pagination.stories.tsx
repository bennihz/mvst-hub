import React from 'react'
import { Meta, Story } from '@storybook/react'
import Pagination, { PaginationProps } from '../components/Pagination'

export default {
    title: 'Pagination',
    component: Pagination,
} as Meta

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />

export const Default = Template.bind({})

Default.args = {
    isLastPage: false,
    isFirstPage: false,
}

export const LastPage = Template.bind({})

LastPage.args = {
    isLastPage: true,
    isFirstPage: false,
}

export const FirstPage = Template.bind({})

FirstPage.args = {
    isLastPage: false,
    isFirstPage: true,
}

export const FirstAndLastPage = Template.bind({})

FirstAndLastPage.args = {
    isLastPage: true,
    isFirstPage: true,
}
