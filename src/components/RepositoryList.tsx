import React, { useState } from 'react';
import RepositoryListItem from './RepositoryListItem';

interface Repository {
    id: number;
    name: string;
    language: string;
}

interface RepositoryListProps {
    repositories: Repository[];
    filter: string;
    languageFilter: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
    const [filter, setFilter] = useState<string>('');
    const [languageFilter, setLanguageFilter] = useState<string>('');

    const filteredRepositories = repositories.filter((repo) => {
        const matchesName = repo.name.toLowerCase().includes(filter.toLowerCase());
        const matchesLanguage =
            !languageFilter || repo.language.toLowerCase() === languageFilter.toLowerCase();

        return matchesName && matchesLanguage;
    });

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Filter by language"
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="ml-2 border p-2 rounded"
                />
            </div>
            <ul className="list-none p-0">
                {filteredRepositories.map((repo) => (
                    <RepositoryListItem key={repo.id} repository={repo} />
                ))}
            </ul>
        </div>
    );
};

export default RepositoryList;
