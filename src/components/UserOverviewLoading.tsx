import React from 'react'

const UserOverviewLoading: React.FC = () => {
    return (
        <div className="flex flex-row md:flex-col items-start p-4 border border-neutral-300 rounded-md bg-w dark:bg-zinc-900 dark:border-neutral-800">
            <div className="mb-2 mr-4 md:mb-4 w-1/3 md:w-full">
                <div className="w-32 h-32 animate-pulse rounded-full md:mx-auto bg-gray-200 dark:bg-gray-800 mb-4" />
            </div>
            <div className="w-2/3 md:w-full">
                <div className="h-6 animate-pulse bg-gray-200 dark:bg-gray-800 rounded w-1/3 md:w-1/2 mb-3 mt-1" />
                <div className="h-4 animate-pulse bg-gray-200 dark:bg-gray-800 rounded w-1/2 md:w-3/4 mb-3" />
                <div className="h-4 animate-pulse bg-gray-200 dark:bg-gray-800 rounded w-1/4 md:w-2/5 mb-3" />
                <div className="h-4 animate-pulse bg-gray-200 dark:bg-gray-800 rounded w-1/4 md:w-2/5 mb-3" />
            </div>
        </div>
    )
}

export default UserOverviewLoading
