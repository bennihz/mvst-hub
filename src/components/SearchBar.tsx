import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [username, setUsername] = useState<string>('');

    const handleSearch = () => {
        if (username.trim() !== '') {
            onSearch(username);
        }
    };

    return (
        <div className="flex items-center space-x-4 ">
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
