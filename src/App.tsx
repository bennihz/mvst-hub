// App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import RepositorySearch from './components/RepositorySearch';
import Loader from './components/Loader';
import Error from './components/Error';
import { getUserRepos } from './services/githubService'; // Import the getUserRepos function

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [repositories, setRepositories] = useState<any[]>([]);

    const handleSearch = async (username: string) => {
        try {
            setLoading(true);

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
            <RepositorySearch onSearch={handleSearch} repositories={repositories} />
            {loading && <Loader />}
            {error && <Error message={error} />}
        </div>
    );
};

export default App;
