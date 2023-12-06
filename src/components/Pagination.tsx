import React from 'react'

export interface PaginationProps {
    isFirstPage: boolean
    isLastPage: boolean
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    isFirstPage,
    isLastPage,
    onPageChange,
}) => {
    return (
        <>
            {/*<!-- Component: Minimal outline pagination with icons and text --> */}
            <nav role="navigation" aria-label="Pagination Navigation">
                <ul className="flex list-none items-center justify-center divide-x divide-slate-200 overflow-hidden text-sm text-slate-700">
                    <li>
                        <button
                            aria-label="Goto Previous Page"
                            className={`inline-flex h-10 items-center
                            justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition
                             duration-300 hover:bg-emerald-50 hover:stroke-safetyOrange
                             hover:text-safetyOrange focus:bg-orange-50 focus:stroke-safetyOrangeDark
                             focus:text-safetyOrangeDark focus-visible:outline-none border-y border-l border-slate-200 rounded-l
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
                            className={`inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm
                            font-medium text-slate-700 transition duration-300 hover:bg-orange-50 hover:stroke-safetyOrange
                             hover:text-safetyOrange focus:bg-orange-50 focus:stroke-safetyOrangeDark focus:text-safetyOrangeDark
                              focus-visible:outline-none border-y border-r border-slate-200 rounded-r
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
