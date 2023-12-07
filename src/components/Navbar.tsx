import React, { useState } from 'react'
import logoSrc from '../logotrans.png'
import logoSrcDark from '../logotrans-dark.png'
import darkmodeIcon from '../darkmode.png'
import lightmodeIcon from '../lightmode.png'

export interface NavbarProps {
    darkMode: boolean
    onDarkModeToggle: () => void
}

export default function Navbar({ darkMode, onDarkModeToggle }: NavbarProps) {
    const [isToggleOpen, setIsToggleOpen] = useState(false)

    return (
        <>
            {/*<!-- Component: Basic Navbar --> */}
            <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden dark:bg-zinc-900 dark:border-gray-700">
                <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
                    <nav
                        aria-label="main navigation"
                        className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700 dark:text-slate-300"
                        role="navigation"
                    >
                        <a
                            id="Logo"
                            aria-label="github-repo-searcher logo"
                            aria-current="page"
                            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
                            href="/"
                        >
                            <img
                                className={`h-12`}
                                src={darkMode ? logoSrcDark : logoSrc}
                                alt="Logo"
                            />
                        </a>
                        {/* Dark mode toggle */}
                        <li role="none" className="flex items-stretch">
                            <button
                                className="flex items-center px-4 py-2"
                                onClick={onDarkModeToggle}
                            >
                                <img
                                    src={
                                        darkMode ? lightmodeIcon : darkmodeIcon
                                    }
                                    alt="dark/light mode icon"
                                    className="w-5 h-5"
                                ></img>
                            </button>
                        </li>
                    </nav>
                </div>
            </header>
        </>
    )
}
