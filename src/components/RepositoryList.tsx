import React from 'react';
import RepositoryListItem from './RepositoryListItem';
import {Repository} from "../types/global";


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
                        <RepositoryListItem key={`loading-${index}`} isLoading={true} repository={{ id: index, name: '', primaryLanguage: {name:''}, description: '' }} />
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
