const BASE_URL = 'https://mvst-hub-proxy.onrender.com';

export interface getUserReposResponse {
  repositories: any[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
}

export const getUserRepos = async (
    username: string,
    name: string | null = null,
    afterCursor: string | null = null,
    perPage: number = 10
): Promise<getUserReposResponse> => {
  const query = `
    query {
      user(login: "${username}") {
        repositories(first: ${perPage}, after: ${afterCursor !== null ? `"${afterCursor}"` : null}, orderBy: {field: UPDATED_AT, direction: DESC}${name ? `, query: "${name} in:name"` : ''}) {
          nodes {
            id
            name
            description
            primaryLanguage {
              name
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    }
  `;

  const variables: any = {
    username,
    perPage,
    afterCursor,
    name,
  };

  const response = await fetch(BASE_URL + '/graphql-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user repositories');
  }

  const data = await response.json();

  const nodes = data?.data?.user?.repositories?.nodes || [];
  const pageInfo = data?.data?.user?.repositories?.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage || false;
  const endCursor = pageInfo?.endCursor || null;
  const hasPreviousPage = pageInfo?.hasPreviousPage || false;

  return { hasPreviousPage, repositories: nodes, endCursor, hasNextPage };
};

interface GitHubUser {
  login: string;
  avatarUrl: string;
  bio: string;
  location?: string;
  htmlUrl: string;
}

export const getUserInfo = async (username: string): Promise<GitHubUser> => {
  const query = `
    query {
      user(login: "${username}") {
        login
        avatarUrl
        bio
        location
        url  # Use 'url' instead of 'htmlUrl'
      }
    }
  `;

  const response = await fetch(BASE_URL + "/graphql-proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user information");
  }

  const { data } = await response.json();
  const userData = data.user;

  return {
    login: userData.login,
    avatarUrl: userData.avatarUrl,
    bio: userData.bio,
    location: userData.location,
    htmlUrl: userData.url,
  };
};
