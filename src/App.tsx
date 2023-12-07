import React, { useState, useEffect } from 'react'
import RepositoryList from './components/RepositoryList'
import Error from './components/Error'
import {
    getUserReposLimited,
    getUserInfo,
    getUserReposAll,
} from './services/githubService'
import Navbar from './components/Navbar'
import SearchBarBig from './components/SearchBarBig'
import UserOverview from './components/UserOverview'
import Pagination from './components/Pagination'
import Search from './components/Search'
import Dropdown from './components/Dropdown'

const App: React.FC = () => {
    const [reposLoading, setReposLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState<string>('')
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)
    const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false)

    const [repoNameFilter, setRepoNameFilter] = useState<string>('')
    const [repoLanguageFilter, setRepoLanguageFilter] = useState<string>('')

    const [filteredRepositories, setFilteredRepositories] = useState<any[]>([])
    const [allRepositories, setAllRepositories] = useState<any[]>([])
    const [displayedRepositories, setDisplayedRepositories] = useState<any[]>(
        [],
    )
    const [page, setPage] = useState<number>(0)
    // set of all available languages in this form  { linkName: string }[]
    const [languages, setLanguages] = useState<any[]>([])

    // hook to reset page and displayedRepositories when filteredRepositories changes
    useEffect(() => {
        setPage(0)
        setDisplayedRepositories(filteredRepositories.slice(0, 10))
        // also set hasNextPage and hasPreviousPage
        if (filteredRepositories.length > 10) {
            setHasNextPage(true)
        } else {
            setHasNextPage(false)
        }
        setHasPreviousPage(false)
    }, [filteredRepositories])

    useEffect(() => {
        setFilteredRepositories(allRepositories)
        const languagesSet = new Set()
        allRepositories.forEach((repo) => {
            if (repo.primaryLanguage) {
                languagesSet.add(repo.primaryLanguage.name)
            }
        })
        // set languages to the set of all available languages in the form { linkName: string }[]
        setLanguages(
            Array.from(languagesSet).map((language) => ({
                linkName: language,
            })),
        )
    }, [allRepositories])

    // fetch all repositories for the user
    const fetchAllRepositories = async () => {
        try {
            const allRepoData = await getUserReposAll(username)
            setAllRepositories(allRepoData.repositories)
            setReposLoading(false)
            setError(null)
        } catch (error) {
            console.error('Error fetching all repositories', error)
            setReposLoading(false)
            setError('Error fetching all repositories.')
        }
    }

    // fetch initial repositories for the user
    const fetchInitialRepositories = async () => {
        try {
            setReposLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 200))

            const initialRepoData = await getUserReposLimited(username, 10)
            setDisplayedRepositories(initialRepoData.repositories)
            setHasNextPage(initialRepoData.hasNextPage)

            setReposLoading(false)

            await fetchAllRepositories()

            setError(null)
        } catch (error) {
            console.error('Error fetching data', error)
            setReposLoading(false)
            setError('Error fetching data.')
        }
    }

    // fetch user info and initial repositories when username changes
    useEffect(() => {
        setUserInfo(null)
        if (username.trim() !== '') {
            fetchUser()
            fetchInitialRepositories()
        }
        setRepoNameFilter('')
        setRepoLanguageFilter('')
    }, [username])

    const fetchUser = async () => {
        try {
            const userData = await getUserInfo(username)
            setUserInfo(userData)
            setError(null)
        } catch (error) {
            console.error('Error fetching data', error)
            setError('Error fetching data.')
        }
    }

    const handlePageChange = (pageChange: number) => {
        const newPage = page + pageChange

        // update hasNextPage and hasPreviousPage
        setHasPreviousPage(newPage > 0)
        setHasNextPage(filteredRepositories.length > (newPage + 1) * 10)

        // update filteredRepositories based on the current page and filters
        const startIndex = newPage * 10
        const endIndex = startIndex + 10
        const filteredRepos = filteredRepositories
            .slice(startIndex, endIndex)
            .filter((repo) =>
                repo.name.toLowerCase().includes(repoNameFilter.toLowerCase()),
            )
            .filter(
                (repo) =>
                    repo.primaryLanguage?.name
                        ?.toLowerCase()
                        .includes(repoLanguageFilter.toLowerCase()),
            )

        setDisplayedRepositories(filteredRepos)
        setPage(newPage)
    }

    useEffect(() => {
        const filteredRepos = allRepositories
            .filter((repo) =>
                repo.name.toLowerCase().includes(repoNameFilter.toLowerCase()),
            )
            .filter(
                (repo) =>
                    repo.primaryLanguage?.name
                        ?.toLowerCase()
                        .includes(repoLanguageFilter.toLowerCase()),
            )
        setFilteredRepositories(filteredRepos)
    }, [repoNameFilter, repoLanguageFilter])

    const handleUserSearch = (text: string) => {
        if (text.trim() === '') {
            return
        }
        setUsername(text)
        setPage(0)
        setHasNextPage(false)
        setHasNextPage(false)
        setFilteredRepositories([])
        setAllRepositories([])
        setDisplayedRepositories([])
    }

    const handleRepoNameFilter = (text: string) => {
        setRepoNameFilter(text)
    }

    const handleRepoLangFilter = (text: string) => {
        setRepoLanguageFilter(text)
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <SearchBarBig onSearch={handleUserSearch} />
                <div className="container flex flex-col md:flex-row md:gap-4 ">
                    {userInfo && (
                        <div className="mb-4 md:mb-0 w-full md:w-1/4">
                            {' '}
                            {/* Adjusted width for md and larger screens */}
                            <UserOverview
                                avatarUrl={userInfo.avatarUrl}
                                username={userInfo.login}
                                bio={userInfo.bio}
                                profileUrl={userInfo.htmlUrl}
                                location={userInfo.location}
                            />
                        </div>
                    )}
                    <div className="md:w-3/4">
                        {userInfo && (
                        <div className="flex flex-col w-full sm:flex-row sm:gap-4">
                            <div className="mb-4 w-full sm:w-3/5">
                                {' '}
                                {/* Adjusted width for md and larger screens */}
                                <Search
                                    onSearch={handleRepoNameFilter}
                                    placeholder="Search for Repository"
                                />
                            </div>
                            <div className="w-full sm:w-2/5">
                                {' '}
                                {/* Adjusted width for md and larger screens */}
                                <Dropdown
                                    navigationItems={languages}
                                    onChange={handleRepoLangFilter}
                                />
                            </div>
                        </div>
                                )}
                        <div className="w-full">
                            {userInfo && (
                                <>
                                    <RepositoryList
                                        repositories={displayedRepositories}
                                        isLoading={reposLoading}
                                        page={page}
                                    />
                                    {error && <Error message={error} />}
                                    {filteredRepositories.length > 0 && (
                                        <Pagination
                                            isFirstPage={!hasPreviousPage}
                                            isLastPage={!hasNextPage}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
