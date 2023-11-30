import React, { useState } from 'react';
import SearchBar from './SearchBar';
import RepositoryList from './RepositoryList';

interface Repository {
    id: number;
    name: string;
    language: string;
}

interface RepositorySearchProps {
    onSearch: (username: string) => Promise<void>;
    repositories: Repository[];
}

const RepositorySearch: React.FC<RepositorySearchProps> = ({ onSearch, repositories }) => {
    const [filter, setFilter] = useState<string>('');
    const [languageFilter, setLanguageFilter] = useState<string>('');

    const handleSearch = async (username: string) => {
        // Call the parent component's onSearch function
        await onSearch(username);
        // Reset filters after search
        setFilter('');
        setLanguageFilter('');
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <RepositoryList repositories={repositories} filter={filter} languageFilter={languageFilter} />
        </div>
    );
};

export default RepositorySearch;
