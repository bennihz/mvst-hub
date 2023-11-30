import React, {useState} from 'react';

export interface ListFilterProps {
    onFilterChange: (nameFilter: string, languageFilter: string) => void;
}

const ListFilter: React.FC<ListFilterProps> = ({ onFilterChange }) => {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [languageFilter, setLanguageFilter] = useState<string>('');

    const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);
        onFilterChange(e.target.value, languageFilter);
    };

    const handleLanguageFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguageFilter(e.target.value);
        onFilterChange(nameFilter, e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Filter by name"
                value={nameFilter}
                onChange={handleNameFilterChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Filter by language"
                value={languageFilter}
                onChange={handleLanguageFilterChange}
                className="ml-2 border p-2 rounded"
            />
        </div>
    );
};

export default ListFilter;
