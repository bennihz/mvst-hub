import React from 'react';

interface Repository {
    id: number;
    name: string;
    language: string;
}

interface RepositoryListItemProps {
    repository: Repository;
}

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({ repository }) => {
    return (
        <li className="border p-4 mb-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-bold mb-2">{repository.name}</h3>
            <p className="text-gray-600">Language: {repository.language === undefined ? 'not specified' : repository.language}</p>
        </li>
    );
};

export default RepositoryListItem;
