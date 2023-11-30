import React from 'react';
import SearchBar from './SearchBar';

interface RepositorySearchProps {
    onSearch: (username: string) => Promise<void>;
}

const RepositorySearch: React.FC<RepositorySearchProps> = ({ onSearch }) => {


    const handleSearch = async (username: string) => {
        await onSearch(username);
    };

    return (
        <div className={"py-2"}>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
};

export default RepositorySearch;
