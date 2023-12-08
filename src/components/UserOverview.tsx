import React from 'react'
import { UserInfo } from '../types/global'

export interface UserOverviewProps {
    userInfo: UserInfo
}

/**
 * A component to display an overview of a GitHub user
 * @param avatarUrl - The URL of the user's avatar
 * @param username - The username of the user
 * @param bio - The bio of the user
 * @param profileUrl - The URL to the user's GitHub profile
 * @param location - The location of the user
 */
const UserOverview: React.FC<UserOverviewProps> = (UserOverviewProps) => {
    const { avatarUrl, login, bio, htmlUrl, location } =
        UserOverviewProps.userInfo

    return (
        <div className="flex flex-row md:flex-col items-start p-4 border border-neutral-300 rounded-md bg-w dark:bg-zinc-900 dark:border-neutral-800 transition-colors duration-300">
            <>
                <div className="mb-2 md:mb-4 w-1/3 md:w-full">
                    <img
                        src={avatarUrl}
                        alt={`${login}'s avatar`}
                        className="w-4/5 h-4/5 rounded-full md:mx-auto" // Center the image horizontally
                    />
                </div>
                <div className="text-left w-2/3 md:w-full">
                    {' '}
                    {/* Keep text elements aligned to the left */}
                    <h2 className="text-xl font-semibold mb-2 dark:text-w">
                        {login}
                    </h2>
                    <p className="text-gray-600 mb-2 dark:text-gray-500">
                        {bio}
                    </p>
                    {location && (
                        <p className="text-gray-500 mb-2">{location}</p>
                    )}
                    <a
                        href={htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        View Profile
                    </a>
                </div>
            </>
        </div>
    )
}

export default UserOverview
