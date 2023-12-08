import React from 'react'

/**
 * A component to display a message when no repositories are found
 */
const NoRepositoriesFound: React.FC = () => {
    return (
        <div className="text-center mt-8">
            <p className="text-gray-500">No repositories found.</p>
        </div>
    )
}

export default NoRepositoriesFound
