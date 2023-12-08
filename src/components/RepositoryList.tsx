import React from 'react'
import RepositoryListItem from './RepositoryListItem'
import { Repository } from '../types/global'
import NoRepositoriesFound from './NoRepositoriesFound'

export interface RepositoryListProps {
    repositories: Repository[]
    isLoading: boolean
    darkMode: boolean
}

/**
 * A component to display a list of repositories
 * @param repositories - The repositories to display
 * @param isLoading - Whether the repositories are loading
 * @param page - The current page
 * @param darkMode - Whether dark mode is enabled
 */
const RepositoryList: React.FC<RepositoryListProps> = ({
    repositories,
    isLoading,
    darkMode,
}) => {
    return (
        <div>
            {isLoading ? (
                <ul className="list-none p-0">
                    {[...Array(7)].map((_, index) => (
                        <RepositoryListItem
                            key={`loading-${index}`}
                            isLoading={true}
                            repository={{
                                id: index,
                                name: '',
                                primaryLanguage: { name: '' },
                                description: '',
                            }}
                            darkMode={darkMode}
                        />
                    ))}
                </ul>
            ) : repositories.length === 0 ? (
                <NoRepositoriesFound />
            ) : (
                <ul className="list-none p-0">
                    {repositories.map((repo) => (
                        <RepositoryListItem
                            key={repo.id}
                            repository={repo}
                            isLoading={false}
                            darkMode={darkMode}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default RepositoryList
