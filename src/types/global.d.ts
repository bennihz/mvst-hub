interface PrimaryLanguage {
    name: string
}

export interface Repository {
    id: number
    name: string
    primaryLanguage: PrimaryLanguage
    description: string | null
}

export interface UserInfo {
    name: string
    avatarUrl: string
    bio: string | null
    location: string | null
    htmlUrl: string
    login: string
}
