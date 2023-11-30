import React from 'react';
import RepositoryListItem from './RepositoryListItem';

interface Repository {
    id: number;
    name: string;
    language: string;
}

interface RepositoryListProps {
    repositories: Repository[];
    isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, isLoading }) => {
    return (
        <div>
            {isLoading ? (
                <ul className="list-none p-0">
                    {[...Array(3)].map((_, index) => (
                        <RepositoryListItem key={`loading-${index}`} isLoading={true} repository={{ id: index, name: '', language: '' }} />
                    ))}
                </ul>
            ) : (
                <ul className="list-none p-0">
                    {repositories.map((repo) => (
                        <RepositoryListItem key={repo.id} repository={repo} isLoading={false} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RepositoryList;
