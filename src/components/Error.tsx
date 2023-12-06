import React from 'react'

interface ErrorProps {
    message: string
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return <div className="text-red-500">{message}</div>
}

export default Error
