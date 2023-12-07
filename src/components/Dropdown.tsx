import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'

export default function Dropdown(props: {
    navigationItems: { linkName: string }[]
    onChange: (item: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState<number | null>(null)
    const wrapperRef = useRef(null)
    const { navigationItems } = props

    useEffect(() => {
        if (currentItem !== null) {
            props.onChange(
                currentItem === -1 ? '' : navigationItems[currentItem].linkName,
            )
        }
    }, [currentItem])

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

    const handleItemClick = (index: number) => {
        setCurrentItem(index)
        setIsOpen(false)
    }

    return (
        <div className="relative inline-flex w-full">
            <button
                className="inline-flex w-full h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                ref={wrapperRef}
            >
                <span className="hidden sm:inline">
                    {currentItem !== null
                        ? navigationItems[currentItem]?.linkName ||
                          'Choose programming language'
                        : 'Choose language'}
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
                } absolute top-full z-10 mt-1 flex w-full list-none flex-col rounded bg-white py-2 shadow-md shadow-slate-500/10`}
            >
                {/* Placeholder item for unselecting */}
                <li key={-1}>
                    <a
                        className={`${
                            currentItem === -1
                                ? 'bg-emerald-50 text-emerald-500'
                                : 'bg-none text-slate-500'
                        } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none`}
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
                                    ? 'bg-emerald-50 text-emerald-500'
                                    : 'bg-none text-slate-500'
                            } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none`}
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
