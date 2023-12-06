import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold">Your Logo</h1>
                <nav className="mt-2">
                    <ul className="flex">
                        <li className="mr-4">
                            <a href="#" className="hover:text-gray-300">
                                Home
                            </a>
                        </li>
                        <li className="mr-4">
                            <a href="#" className="hover:text-gray-300">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
