import React, { useState } from 'react';
import SearchBar from './SearchBar';

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
        await onSearch(username);
        setFilter('');
        setLanguageFilter('');
    };

    return (
        <div className={"py-2"}>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
};

export default RepositorySearch;
