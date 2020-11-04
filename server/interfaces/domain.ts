export interface Domain {
    _id: string,
    origin: string,
    lang: string,
    owner: string,
    favicon: string,
    token: string,
    services: string[],
    settings: {
        reviews: {
            enabled: boolean,
            preEdit?: boolean,
        },
    },
}
