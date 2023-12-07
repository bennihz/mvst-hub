// app.tsx
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

    const fetchAllRepositories = async () => {
        try {
            const allRepoData = await getUserReposAll(username)
            setAllRepositories(allRepoData.repositories)
            setFilteredRepositories(allRepoData.repositories)

            setReposLoading(false)
            setError(null)
        } catch (error) {
            console.error('Error fetching all repositories', error)
            setReposLoading(false)
            setError('Error fetching all repositories.')
        }
    }

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
        setHasNextPage(allRepositories.length > (newPage + 1) * 10)

        // update filteredRepositories based on the current page
        const startIndex = newPage * 10
        const endIndex = startIndex + 10
        console.log(filteredRepositories.slice(startIndex, endIndex))
        setDisplayedRepositories(
            filteredRepositories.slice(startIndex, endIndex),
        )
        setPage(newPage)
    }

    const handleRepoNameFilter = (text: string) => {
        if (text.trim() === '') {
            return
        }
        setRepoNameFilter(text)
    }

    const handleRepoLangFilter = (text: string) => {
        if (text.trim() === '') {
            return
        }
        setRepoLanguageFilter(text)
    }

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

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <SearchBarBig onSearch={handleUserSearch} />
                <div className="container flex">
                    <div className="w-1/3">
                        {userInfo && (
                            <UserOverview
                                avatarUrl={userInfo.avatarUrl}
                                username={userInfo.login}
                                bio={userInfo.bio}
                                profileUrl={userInfo.htmlUrl}
                                location={userInfo.location}
                            />
                        )}
                    </div>
                    <div className="w-2/3 pl-4">
                        {userInfo && (
                            <>
                                <div className="flex justify-end gap-4">
                                    <Search
                                        onSearch={handleRepoNameFilter}
                                        placeholder="Search for Repository"
                                    />
                                    <Search
                                        onSearch={handleRepoLangFilter}
                                        placeholder="Filter language"
                                    />
                                </div>
                                <RepositoryList
                                    repositories={displayedRepositories}
                                    isLoading={reposLoading}
                                    page={page}
                                />
                            </>
                        )}
                        {error && <Error message={error} />}
                        {filteredRepositories.length > 0 && (
                            <Pagination
                                isFirstPage={!hasPreviousPage}
                                isLastPage={!hasNextPage}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
