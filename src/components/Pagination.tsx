import React from 'react'

export interface PaginationProps {
    isFirstPage: boolean
    isLastPage: boolean
    onPageChange: (page: number) => void
}

/**
 * A component to display pagination
 * @param isFirstPage
 * @param isLastPage
 * @param onPageChang
 */
const Pagination: React.FC<PaginationProps> = ({
    isFirstPage,
    isLastPage,
    onPageChange,
}) => {
    return (
        <>
            {/*<!-- Component: Minimal outline pagination with icons and text --> */}
            <nav role="navigation" aria-label="Pagination Navigation">
                <ul className="flex list-none items-center justify-center divide-x divide-slate-200 dark:divide-neutral-900 overflow-hidden text-sm text-slate-700">
                    <li>
                        <button
                            aria-label="Goto Previous Page"
                            className={`
                            inline-flex h-10 items-center
                            justify-center gap-4 stroke-slate-700 px-4 text-sm 
                            font-medium text-slate-700 transition
                             duration-300 hover:bg-sky-100 hover:stroke-sky-600
                             active:bg-sky-300 focus:text-sky-600 
                             focus-visible:outline-none border-y border-l 
                             border-neutral-300 rounded-l bg-white
                             dark:bg-zinc-900 dark:stroke-gray-700 
                             dark:text-zinc-100 dark:hover:bg-zinc-800
                             dark:border-neutral-800
                             ${
                                 isFirstPage
                                     ? 'opacity-50 cursor-not-allowed'
                                     : ''
                             }`}
                            onClick={() => !isFirstPage && onPageChange(-1)}
                        >
                            <span className="order-2">Prev </span>
                        </button>
                    </li>

                    <li>
                        <button
                            aria-label="Goto Next Page"
                            className={`inline-flex h-10 items-center
                            justify-center gap-4 stroke-slate-700 px-4 text-sm 
                            font-medium text-slate-700 transition
                             duration-300 hover:bg-sky-100 hover:stroke-sky-600
                             active:bg-sky-300 focus:text-sky-600 
                             focus-visible:outline-none 
                             border-neutral-300 rounded-r bg-white
                             dark:bg-zinc-900 dark:stroke-gray-700 
                             dark:text-zinc-100 dark:hover:bg-zinc-800
                             border-y border-r bg-white dark:border-neutral-800 
                              ${
                                  isLastPage
                                      ? 'opacity-50 cursor-not-allowed'
                                      : ''
                              }`}
                            onClick={() => !isLastPage && onPageChange(1)}
                        >
                            <span>Next </span>
                        </button>
                    </li>
                </ul>
            </nav>
            {/*<!-- End Minimal outline pagination with icons and text --> */}
        </>
    )
}

export default Pagination
