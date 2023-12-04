const BASE_URL = 'https://mvst-hub-proxy.onrender.com/graphql-proxy';

export const getUserRepos = async (username: string): Promise<any[]> => {
    const query = `
    query {
      user(login: "${username}") {
        repositories(first: 50) {
          nodes {
            id
            name
            description
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  `;

    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });


    if (!response.ok) {
        throw new Error('Failed to fetch user repositories');
    }

    const data = await response.json();
    console.log(data);
    return data?.data?.user?.repositories?.nodes || [];
};
