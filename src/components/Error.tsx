import React from 'react'

export interface ErrorProps {
    message: string
}

/**
 * A component to display an error message
 * @param message - The error message to display
 */
const Error: React.FC<ErrorProps> = ({ message }) => {
    return <div className="text-red-500">{message}</div>
}

export default Error
