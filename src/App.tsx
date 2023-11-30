import React, { useState } from 'react';
import Header from './components/Header';
import RepositorySearch from './components/RepositorySearch';
import ListFilter from './components/ListFilter';
import RepositoryList from './components/RepositoryList';
import useFilter from './hooks/useFilter';
import Error from './components/Error';
import { getUserRepos } from './services/githubService';
import { useEffect } from 'react';


const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [repositories, setRepositories] = useState<any[]>([]);

    const { filteredRepositories, handleFilterChange } = useFilter(repositories, {
        nameFilter: '',
        languageFilter: '',
    });

    useEffect(() => {}, [repositories, filteredRepositories]);

    const handleSearch = async (username: string) => {
        try {
            setLoading(true);

            // Simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            const data = await getUserRepos(username);

            setLoading(false);
            setError(null);
            setRepositories(data);
        } catch (error) {
            console.error('Error fetching repositories', error);
            setLoading(false);
            setError('Error fetching repositories.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Header />
            <RepositorySearch onSearch={handleSearch} />
            <ListFilter onFilterChange={handleFilterChange} />
            <RepositoryList repositories={filteredRepositories} isLoading={loading} />
            {error && <Error message={error} />}
        </div>
    );
};

export default App;
