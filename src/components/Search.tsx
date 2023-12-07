import React, { useState, useEffect } from 'react'

export interface SearchRepoProps {
    onSearch: (text: string) => void
    placeholder: string
}

const Search: React.FC<SearchRepoProps> = ({ onSearch, placeholder }) => {
    const [text, setText] = useState<string>('')

    useEffect(() => {
        onSearch(text)
    }, [text])

    return (
        <>
            <div className="relative mb-4">
                <input
                    type="text"
                    name="id-b16"
                    placeholder={placeholder}
                    className="relative w-full h-10 px-4 pr-12 text-sm transition-all border rounded outline-none peer border-slate-300 text-slate-600 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-stone-400 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400  bg-zinc-50"
                    onChange={(e) => setText(e.target.value)}
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
