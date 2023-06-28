export type TCards = {
    city: string
    temp: number
    weather: string
    visibility: number
    humidity: number
    feels: number
    wind: number
    icon: string
    animatedIcon: string[]
    description: string
}

export type TWeatherApiResponse = {
    name: string
    main: {
        humidity: number
        temp: number
        feels_like: number
    },
    weather: Array<{
        main: string
        icon: string
        description: string
    }>
    visibility: number
    wind: {
        speed: number
    }
}