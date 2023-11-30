import React from 'react';
import ContentLoader from "react-content-loader";

interface Repository {
    id: number;
    name: string;
    language: string;
}

export interface RepositoryListItemProps {
    repository?: Repository;
    isLoading: boolean;
}

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({ repository = {}, isLoading }) => {
    return (
        <>
        {isLoading ? (
            <li className="border p-4 mb-4 rounded flex items-start justify-start list-none">
                <ContentLoader
                    speed={0.5}
                    height={60}
                    viewBox="0 0 400 60"
                    backgroundColor="#e1e1e1"
                    foregroundColor="#f2f2f2"
                >
                    <rect x="0" y="0" rx="3" ry="3" width="200" height="25" />
                    <rect x="0" y="40" rx="3" ry="3" width="150" height="15" />
                </ContentLoader>
            </li>
            ) : (
            <li className="border p-4 mb-4 rounded transition duration-300 ease-in-out list-none transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2">{repository.name}</h3>
                <p className="text-gray-600">Language: {repository.language === undefined ? 'not specified' : repository.language}</p>
            </li>
            )}
        </>
    );
};

export default RepositoryListItem;
