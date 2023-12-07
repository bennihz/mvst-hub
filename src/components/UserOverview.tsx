import React from 'react'

export interface UserOverviewProps {
    avatarUrl: string
    username: string
    bio: string
    profileUrl: string
    location?: string
}

const UserOverview: React.FC<UserOverviewProps> = ({
    avatarUrl,
    username,
    bio,
    profileUrl,
    location,
}) => {
    return (
        <div className="flex flex-row md:flex-col items-start p-4 border border-neutral-300 rounded-md bg-w dark:bg-zinc-900 dark:border-neutral-800">
            <div className="mb-2 md:mb-4 w-1/3 md:w-full">
                <img
                    src={avatarUrl}
                    alt={`${username}'s avatar`}
                    className="w-4/5 h-4/5 rounded-full md:mx-auto" // Center the image horizontally
                />
            </div>
            <div className="text-left w-2/3 md:w-full">
                {' '}
                {/* Keep text elements aligned to the left */}
                <h2 className="text-xl font-semibold mb-2 dark:text-w">{username}</h2>
                <p className="text-gray-600 mb-2 dark:text-gray-500">{bio}</p>
                {location && <p className="text-gray-500 mb-2">{location}</p>}
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    View Profile
                </a>
            </div>
        </div>
    )
}

export default UserOverview
