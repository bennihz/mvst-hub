import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'

export interface DropdownProps {
    navigationItems: { linkName: string }[]
    onChange: (item: string) => void
    disabled: boolean
}

export default function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState<number | null>(null)
    const wrapperRef = useRef(null)
    const { navigationItems } = props

    /**
     * Update the current item when the dropdown is opened
     */
    useEffect(() => {
        if (currentItem !== null) {
            props.onChange(
                currentItem === -1 ? '' : navigationItems[currentItem].linkName,
            )
        }
    }, [currentItem])

    /**
     * Handle keyboard events
     */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen) {
                e.preventDefault()

                switch (e.keyCode) {
                    // KeyDown
                    case 40:
                        setCurrentItem((prevItem) =>
                            prevItem === navigationItems.length - 1
                                ? 0
                                : (prevItem || 0) + 1,
                        )
                        break
                    // KeyUp
                    case 38:
                        setCurrentItem((prevItem) =>
                            prevItem === 0
                                ? navigationItems.length - 1
                                : (prevItem || 0) - 1,
                        )
                        break
                    // Escape
                    case 27:
                        setCurrentItem(1)
                        setIsOpen(false)
                        break
                    default:
                        break
                }
            }
        }

        window.addEventListener(
            'keydown',
            handleKeyDown as unknown as EventListener,
        )

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown as unknown as EventListener,
            )
        }
    }, [isOpen])

    /**
     * Close the dropdown when clicked outside
     */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !(wrapperRef.current as any).contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [wrapperRef])

    /**
     * Handle item click
     */
    const handleItemClick = (index: number) => {
        setCurrentItem(index)
        setIsOpen(false)
    }

    return (
        <div className="relative inline-flex w-full mb-4 md:mb-0">
            <button
                className="inline-flex w-full h-10 items-center justify-center gap-2 whitespace-nowrap
                rounded bg-w dark:bg-zinc-900 px-5 text-sm text-gray-600 tracking-wide transition
                duration-300 hover:bg-zinc-100 focus-visible:outline-none
                disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 border focus:bg-white dark:focus:bg-zinc-800
                disabled:shadow-none  dark:text-gray-400 dark:border-gray-700 dark:focus:bg-zinc-900 dark:focus:border-sky-700
                dark:focus:border-2 dark:hover:bg-zinc-900 dark:hover:text-gray-400 dark:hover:border-gray-700
                dark:disabled:bg-zinc-950 dark:disabled:text-zinc-400 dark:disabled:border-gray-700
                dark:disabled:cursor-not-allowed dark:disabled:shadow-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                ref={wrapperRef}
                disabled={props.disabled}
            >
                <span className="sm:inline">
                    {currentItem !== null
                        ? navigationItems[currentItem]?.linkName || 'Language'
                        : 'Language'}
                </span>
                <span className="relative only:-mx-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="t-01 d-01"
                        role="graphics-symbol"
                    >
                        <title id="t-01">Button icon</title>
                        <desc id="d-01">
                            An icon describing the buttons usage
                        </desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </span>
            </button>
            <ul
                className={`${
                    isOpen ? 'flex' : 'hidden'
                } absolute top-full z-10 mt-1 flex w-full list-none flex-col rounded bg-white dark:bg-zinc-900 py-2 shadow-md shadow-slate-500/10 dark:bg-zinc-900 dark:shadow-zinc-900/10 dark:border dark:border-neutral-800`}
            >
                {/* Placeholder item for unselecting */}
                <li key={-1}>
                    <a
                        className={`${
                            currentItem === -1
                                ? 'bg-sky-50 text-sky-600 dark:bg-sky-900 dark:text-gray-400'
                                : 'bg-none text-slate-500'
                        } flex items-start justify-start gap-2 p-2 px-5 transition-colors  
                        duration-300 hover:bg-zinc-100 hover:text-sky-600 focus:bg-sky-50 dark:focus:bg-sky-900 focus:text-sky-600
                        focus:outline-none focus-visible:outline-none 
                        dark:hover:bg-zinc-700 dark:hover:text-gray-400 
                        dark:focus:border-gray-700 dark:focus:border-2`}
                        href="#"
                        onMouseDown={() => handleItemClick(-1)}
                    >
                        <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                            <span className="truncate leading-5">All</span>
                        </span>
                    </a>
                </li>
                {/* Actual items */}
                {navigationItems.map((item, index) => (
                    <li key={index}>
                        <a
                            className={`${
                                index === currentItem
                                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-900 dark:text-gray-400'
                                    : 'bg-none text-slate-500'
                            } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-zinc-100
                             hover:text-sky-600 focus:bg-sky-50 focus:text-sky-600 focus:outline-none focus-visible:outline-none
                              dark:hover:bg-zinc-700 dark:hover:text-gray-400 dark:focus:bg-zinc-900 dark:focus:border-sky-700
                               dark:focus:border-2  dark:focus:border-gray-700 dark:disabled:bg-gray-700`}
                            href="#"
                            onMouseDown={() => handleItemClick(index)}
                        >
                            <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                                <span className="truncate leading-5">
                                    {item.linkName}
                                </span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
