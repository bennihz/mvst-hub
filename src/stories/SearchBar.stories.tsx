import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Input, { InputProps } from '../components/common/Input';

export default {
    title: 'Input',
    component: Input,
    argTypes: {
        onChange: { action: 'changed' },
    },
} as Meta;

const Template: Story<InputProps> = (args) => {
    const [value, setValue] = useState(args.value || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        args.onChange(e);
    };

    return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
    type: 'text',
    placeholder: 'Enter text',
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
    type: 'text',
    placeholder: 'Custom Style',
    className: 'text-red-500', // custom styling
};
