import { useState, useEffect } from 'react';

interface Repository {
    id: number;
    name: string;
    primaryLanguage: {
        name: string;
    }
    description: string;
}

interface FilterOptions {
    nameFilter: string;
    languageFilter: string;
}

const useFilter = (repositories: Repository[], initialOptions: FilterOptions) => {
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>(repositories);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialOptions);

    useEffect(() => {
        const filteredRepos = repositories.filter((repo) => {
            const matchesName = repo.name.toLowerCase().includes(filterOptions.nameFilter.toLowerCase());
            const matchesLanguage =
                !filterOptions.languageFilter || repo.primaryLanguage.name.toLowerCase() === filterOptions.languageFilter.toLowerCase();

            return matchesName && matchesLanguage;
        });

        setFilteredRepositories(filteredRepos);
    }, [repositories, filterOptions]);

    const handleFilterChange = (nameFilter: string, languageFilter: string) => {
        setFilterOptions({ nameFilter, languageFilter });
    };

    return { filteredRepositories, handleFilterChange };
};

export default useFilter;
