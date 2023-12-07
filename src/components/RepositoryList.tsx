import React from 'react'
import RepositoryListItem from './RepositoryListItem'
import { Repository } from '../types/global'
import NoRepositoriesFound from '../stories/NoRepositoriesFound'

export interface RepositoryListProps {
    repositories: Repository[]
    isLoading: boolean
    page: number
}

const RepositoryList: React.FC<RepositoryListProps> = ({
    repositories,
    isLoading,
    page,
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
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default RepositoryList
