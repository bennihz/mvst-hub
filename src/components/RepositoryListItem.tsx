import React from 'react'
import ContentLoader from 'react-content-loader'
import { Repository } from '../types/global'

export interface RepositoryListItemProps {
    repository?: Repository
    isLoading: boolean
}

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({
    repository = {},
    isLoading,
}) => {
    const { name, primaryLanguage, description } = repository

    return (
        <>
            {isLoading ? (
                <li className="border border-neurtal-300 p-4 mb-4 rounded flex items-start justify-start list-none bg-white dark:bg-zinc-900">
                    <ContentLoader
                        speed={0.5}
                        height={60}
                        viewBox="0 0 400 60"
                        backgroundColor="#e1e1e1"
                        foregroundColor="#f2f2f2"
                    >
                        <rect
                            x="0"
                            y="10"
                            rx="3"
                            ry="3"
                            width="100"
                            height="15"
                        />
                        <rect
                            x="0"
                            y="30"
                            rx="3"
                            ry="3"
                            width="150"
                            height="10"
                        />
                        <rect
                            x="0"
                            y="45"
                            rx="3"
                            ry="3"
                            width="350"
                            height="10"
                        />
                    </ContentLoader>
                </li>
            ) : (
                <li className="border border-neutral-300 p-4 mb-4 rounded transition list-none bg-white dark:bg-zinc-900 dark:border-neutral-800">
                    <h3 className="text-xl font-bold dark:text-zinc-100 ">
                        {name ?? 'No Name'}
                    </h3>
                    <p className="text-gray-600 mb-2 dark:text-gray-500">
                        {primaryLanguage?.name ?? 'Language not specified'}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {description ?? 'No description'}
                    </p>
                </li>
            )}
        </>
    )
}

export default RepositoryListItem
