import type { Meta, StoryObj } from '@storybook/react';

import Button from "./../components/common/Button"

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
    render: () => <Button variant={"primary"} label={"Press me"} />,
};

export const WithProp: Story = {
    render: () => <Button variant={"primary"} label={"Press me"} />,
};