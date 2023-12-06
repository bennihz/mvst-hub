import React from 'react'
import { Meta, Story } from '@storybook/react'
import UserOverview, { UserOverviewProps } from '../components/UserOverview'

export default {
    title: 'UserOverview',
    component: UserOverview,
} as Meta

const Template: Story<UserOverviewProps> = (args) => {
    return (
        <div className="container ">
            <div className="w-1/3">
                <UserOverview {...args} />
            </div>
        </div>
    )
}

export const Default = Template.bind({})

Default.args = {
    avatarUrl: 'https://avatars.githubusercontent.com/u/56519760?v=4',
    username: 'bennihz',
    bio: 'CS undergraduate at TUM',
    profileUrl: 'https://github.com/bennihz',
    location: 'Munich, Germany',
}
