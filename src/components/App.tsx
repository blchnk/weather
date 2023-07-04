import s from './App.module.scss'
import {useEffect, useState} from "react"
import {TCards, TWeatherApiResponse} from "../types/types";
import Carousel from "./Carousel.tsx";
import backgroundImg from '../assets/background.png'

function App() {
    const [cards, setCards] = useState<TCards[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleString())
    const [updateCount, setUpdateMarker] = useState<number>(0)

    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const key = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
        setInterval(() => {
            setCurrentDate(new Date().toLocaleString())
        }, 1000)

        setInterval(() => {
            setUpdateMarker((u) => u++)
        }, 1000 * 60)
    }, [])

    useEffect(() => {
        fetchWeatherData('Moscow').then((data) => createNewCardObject(data))
        fetchWeatherData('London').then((data) => createNewCardObject(data))
        fetchWeatherData('Paris').then((data) => createNewCardObject(data))
    }, [updateCount])

    useEffect(() => {
        if (cards.length > 2) setLoading(false)
    }, [cards])

    const fetchWeatherData = (city: string): Promise<TWeatherApiResponse> => {
        return (fetch(`${url}?q=${city}&units=metric&APPID=${key}`)
            .then(response => response.json()))
    }

    const createNewCardObject = (data: TWeatherApiResponse): void => {
        console.log(data)

        const description = data.weather[0].description
        const animatedIcon: string[] = []

        switch (description) {
            case 'clear sky':
                animatedIcon.push('sunny')
                break
            case 'few clouds':
                animatedIcon.push('partly_cloudy', 'partly_cloudy__sun', 'partly_cloudy__cloud')
                break
            case 'overcast clouds':
            case 'broken clouds':
                animatedIcon.push('cloudy')
                break
            case 'rain':
            case 'light rain':
            case 'moderate rain':
                animatedIcon.push('rainy', 'rainy__cloud', 'rainy__rain')
                break
            case 'thunderstorm':
                animatedIcon.push('thundery', 'thundery__cloud', 'thundery__rain')
                break
        }

        setCards((c) => [...c, {
            city: data.name,
            temp: Math.floor(data.main.temp),
            weather: data.weather[0].main,
            visibility: Math.floor(data.visibility / 1000),
            humidity: data.main.humidity,
            feels: data.main.feels_like,
            wind: data.wind.speed,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            animatedIcon: animatedIcon
        }])
    }

    return (
        <>
            <div className={s.background} style={{backgroundImage: `url(${backgroundImg})`}}>
                <div className={'container'}>
                    {
                        loading ? <div className={s.loadingAnimation}></div> :
                            <Carousel cards={cards} currentDate={currentDate}/>
                    }
                </div>
            </div>
        </>
    )
}

export default App
