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
        <div className="flex flex-row md:flex-col items-start p-4 border border-gray-300 rounded-md">
            <div className="mb-2 md:mb-4 w-1/3">
                <img
                    src={avatarUrl}
                    alt={`${username}'s avatar`}
                    className="w-4/5 h-4/5 rounded-full " // Center the image horizontally
                />
            </div>
            <div className="text-left w-2/3">
                {' '}
                {/* Keep text elements aligned to the left */}
                <h2 className="text-xl font-semibold mb-2">{username}</h2>
                <p className="text-gray-600 mb-2">{bio}</p>
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
