const BASE_URL = 'https://api.github.com';

export const getUserRepos = async (username: string): Promise<any[]> => {
    const response = await fetch(`${BASE_URL}/users/${username}/repos`);
    if (!response.ok) {
        throw new Error('Failed to fetch user repositories');
    }

    return response.json();
};