import React, { useState, useEffect } from 'react'

export interface SearchRepoProps {
    onSearch: (text: string) => void
    placeholder: string
    disabled: boolean
}

/**
 * A component to display a search input
 * @param onSearch - The function to call when the search input changes
 * @param placeholder - The placeholder text
 */
const Search: React.FC<SearchRepoProps> = ({
    onSearch,
    placeholder,
    disabled,
}) => {
    const [text, setText] = useState<string>('')

    /**
     * Update the search text when the input changes
     */
    useEffect(() => {
        onSearch(text)
    }, [text])

    return (
        <>
            <div className="relative">
                <input
                    type="text"
                    name="id-b16"
                    placeholder={placeholder}
                    className="relative w-full h-10 px-4 pr-12 text-sm transition-all border rounded outline-none peer
                    border-slate-300 text-slate-600 autofill:bg-white  invalid:border-pink-500 invalid:text-pink-500
                    focus:border-stone-400 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none
                    disabled:cursor-not-allowed disabled:test-stone-400 bg-white
                    dark:bg-zinc-900 dark:border-gray-700 dark:focus:border-sky-700 dark:text-w
                    disabled:bg-stone-50 transition-colors duration-300
                    dark:disabled:bg-zinc-950 dark:disabled:text-zinc-400 dark:placeholder-gray-500 dark:peer-disabled:bg-zinc-950 dark:peer-disabled:text-zinc-400

                    "
                    onChange={(e) => setText(e.target.value)}
                    disabled={disabled}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    aria-labelledby="title-12 description-12"
                    role="graphics-symbol"
                >
                    <title id="title-12">Search icon</title>
                    <desc id="description-12">Icon description here</desc>
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

export default Search
