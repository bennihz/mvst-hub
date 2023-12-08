import { Repository, UserInfo } from '../types/global'

const BASE_URL = 'https://mvst-hub-proxy.onrender.com'

export interface getUserReposResponse {
    repositories: any[]
}

export interface getUserReposLimitedResponse {
    repositories: any[]
    hasNextPage: boolean
}

/**
 * Fetches the repositories of a GitHub user.
 * @param username
 * @param perPage
 * @returns getUserReposLimitedResponse
 */
export const getUserReposLimited = async (
    username: string,
    perPage: number,
): Promise<getUserReposLimitedResponse> => {
    if (perPage <= 0) {
        throw new Error('Invalid value for perPage. It must be greater than 0.')
    }

    const query = `
    query {
      user(login: "${username}") {
        repositories(first: ${perPage}, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
  `

    const variables: any = {
        username,
        perPage,
    }

    const response = await fetch(BASE_URL + '/graphql-proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user repositories')
    }

    const data = await response.json()

    console.log(data)

    const repositories = data?.data?.user?.repositories?.nodes || []
    const hasNextPage =
        data?.data?.user?.repositories?.pageInfo?.hasNextPage || false

    return { repositories, hasNextPage }
}

/**
 * Fetches the repositories of a GitHub user.
 * @param username
 * @returns getUserReposResponse
 */
export const getUserReposAll = async (
    username: string,
): Promise<getUserReposResponse> => {
    let hasNextPage = true
    let endCursor = null
    let allRepositories: Repository[] = []

    while (hasNextPage) {
        const query = `
      query {
        user(login: "${username}") {
          repositories(first: 100, after: ${
              endCursor !== null ? `"${endCursor}"` : null
          }, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
    `

        const variables: any = {
            username,
            perPage: 100,
            endCursor,
        }

        const response: any = await fetch(BASE_URL + '/graphql-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        })

        if (!response.ok) {
            throw new Error('Failed to fetch user repositories')
        }

        const data = await response.json()
        const repositories = data?.data?.user?.repositories?.nodes || []

        // if a repository has no primary language, it will be null, so we insert an empty object with name = 'not specified'
        repositories.forEach((repo: any) => {
            if (repo.primaryLanguage === null) {
                repo.primaryLanguage = { name: 'not specified' }
            }
        })

        allRepositories = [...allRepositories, ...repositories]
        const pageInfo = data?.data?.user?.repositories?.pageInfo
        hasNextPage = pageInfo?.hasNextPage || false
        endCursor = pageInfo?.endCursor || null
    }

    return { repositories: allRepositories }
}

/**
 * Fetches the user information of a GitHub user.
 * @param username
 * @returns UserInfo
 * @returns null if the user does not exist
 */
export const getUserInfo = async (
    username: string,
): Promise<UserInfo | null> => {
    const query = `
    query {
      user(login: "${username}") {
        login
        avatarUrl
        bio
        location
        url  # Use 'url' instead of 'htmlUrl'
        name
      }
    }
  `

    const response = await fetch(BASE_URL + '/graphql-proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user information')
    }

    const { data } = await response.json()

    if (data.user === null) {
        return null
    } else {
        const userData = data.user
        return {
            login: userData.login,
            avatarUrl: userData.avatarUrl,
            bio: userData.bio,
            location: userData.location,
            htmlUrl: userData.url,
            name: userData.name,
        }
    }
}
