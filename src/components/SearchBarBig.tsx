import React, { useState } from 'react'

export interface SearchBarBigProps {
    onSearch: (username: string) => void
}

/**
 * A component to display a search input
 * @param onSearch - The function to call when the search input changes
 */
const SearchBarBig: React.FC<SearchBarBigProps> = ({ onSearch }) => {
    const [username, setUsername] = useState<string>('')

    /**
     * Update the search text when the input changes
     */
    const handleSearch = () => {
        if (username.trim()) {
            onSearch(username)
        }
    }

    /**
     * Update the search text when the input changes
     */
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <>
            <div className={"relative"}>
                <input
                    type="text"
                    placeholder="Search for a GitHub-user"
                    className="relative w-full h-12 px-4 pr-12 border rounded outline-none peer border-neutral-300
                    text-slate-600 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500  focus:outline-none focus:border-stone-400
                    focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50
                    disabled:text-slate-500 bg-white dark:bg-zinc-900 dark:border-gray-700 dark:focus:border-sky-700 dark:text-w transition-colors duration-300"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    aria-labelledby="title-9 description-9"
                    role="graphics-symbol"
                    onClick={handleSearch}
                >
                    <title id="title-9">Search icon</title>
                    <desc id="description-9">Icon description here</desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </div>
        </>
    )
}

export default SearchBarBig
