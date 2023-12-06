interface PrimaryLanguage {
    name: string
}

export interface Repository {
    id: number
    name: string
    primaryLanguage: PrimaryLanguage
    description: string | null
}
