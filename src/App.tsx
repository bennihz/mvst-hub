import React, { useState, useEffect } from 'react'
import RepositoryList from './components/RepositoryList'
import Error from './components/Error'
import { getUserRepos, getUserInfo } from './services/githubService'
import Navbar from './components/Navbar'
import SearchBarBig from './components/SearchBarBig'
import UserOverview from './components/UserOverview'
import Pagination from './components/Pagination'
import Search from './components/Search'
import NoRepositoriesFound from './stories/NoRepositoriesFound'

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState<string>('')
    const [repositories, setRepositories] = useState<any[]>([])
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [hasNextPage, setHasNextPage] = useState<any | null>(true)
    const [hasPreviousPage, setHasPreviousPage] = useState<any | null>(false)
    const [endCursorArray, setEndCursorArray] = useState<string[]>([])
    const [repoNameFilter, setRepoNameFilter] = useState<string>('')
    const [repoLanguageFilter, setRepoLanguageFilter] = useState<string>('')

    useEffect(() => {}, [repositories])

    useEffect(() => {
        setEndCursorArray([])
        if (username.trim() !== '') {
            fetchUser()
            fetchRepositories()
        }
        setRepoNameFilter('')
        setRepoLanguageFilter('')
    }, [username])

    useEffect(() => {
        setEndCursorArray([])
        console.log('changed filter', repoNameFilter)
        fetchRepositories()
    }, [repoNameFilter])

    const handleUserSearch = async (username: string) => {
        setUsername(username)
        setEndCursorArray([])
    }

    const fetchUser = async () => {
        try {
            setLoading(true)

            const userData = await getUserInfo(username)

            setUserInfo(userData)

            setLoading(false)
            setError(null)
        } catch (error) {
            console.error('Error fetching data', error)
            setLoading(false)
            setError('Error fetching data.')
        }
    }

    const fetchRepositories = async () => {
        try {
            setLoading(true)

            let repoData = null

            if (endCursorArray.length === 0) {
                repoData = await getUserRepos(username, repoNameFilter, null)
            } else {
                repoData = await getUserRepos(
                    username,
                    repoNameFilter,
                    endCursorArray[endCursorArray.length - 1]
                )
            }

            console.log(repoData)
            setRepositories(repoData.repositories)
            setEndCursorArray([...endCursorArray, repoData.endCursor])
            setHasNextPage(repoData.hasNextPage)
            setHasPreviousPage(repoData.hasPreviousPage)
            setLoading(false)
            setError(null)
        } catch (error) {
            console.error('Error fetching data', error)
            setLoading(false)
            setError('Error fetching data.')
        }
    }

    const handlePageChange = async (page: number) => {
        if (page > 0) {
            await fetchRepositories()
        } else {
            endCursorArray.pop()
            endCursorArray.pop()
            await fetchRepositories()
        }
    }

    const handleRepoNameFilter = async (text: string) => {
        console.log(text)
        if (text.trim() === '') {
            return
        }
        setRepoNameFilter(text)
    }

    const handleRepoLangFilter = async (text: string) => {
        if (text.trim() === '') {
            return
        }
        setRepoLanguageFilter(text)
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                {/* User Overview - 2/5 width */}
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
                                {repositories && repositories.length > 0 ? (
                                    <RepositoryList
                                        repositories={repositories}
                                        isLoading={loading}
                                    />
                                ) : (
                                    <NoRepositoriesFound />
                                )}
                            </>
                        )}
                        {error && <Error message={error} />}
                        {repositories.length > 0 && (
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
