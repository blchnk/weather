// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactCardCarousel from "react-card-carousel";
import s from "./Carousel.module.scss";
import {TCards} from "../types/types";
import dots from "../assets/Vector.svg";

const Carousel = ({cards, currentDate}: { cards: TCards[], currentDate: string }) => {

    return (
        <>
            <div className={[s.cardsWrapper, 'no-select'].join(' ')}>
                <ReactCardCarousel spread={'medium'} autoplay={false} autoplay_speed={2500}>
                    {cards.map((item: TCards, key: number) =>
                        <div className={s.card} key={key}>
                            <img className={s.dotsSvg} src={dots} alt="dots"/>
                            <div className={s.cardHeader}>
                                {
                                    item.animatedIcon[0] ?
                                        <div className={item.animatedIcon[0]}>
                                            <div className={item.animatedIcon[1]}></div>
                                            <div className={item.animatedIcon[2]}></div>
                                        </div> :
                                        <img src={`https://openweathermap.org/img/wn/${item.icon}2x.png`} alt=""/>
                                }
                                <div className={s.textWrapper}>
                                    <p className={s.city}>{item.city}</p>
                                    <p className={s.day}>{currentDate}</p>
                                </div>
                            </div>
                            <div className={s.cardMain}>
                                <p className={s.weatherTemp}>{item.temp}&deg;</p>
                                <p className={s.weatherText}>{item.weather}</p>
                            </div>
                            <div className={s.cardFooter}>
                                <div className={s.otherParamsInfoWrapper}>
                                    <p>Visibility {item.visibility}km</p>
                                    <p>Humidity {item.humidity}mm</p>
                                </div>
                                <div className={s.otherParamsInfoWrapper}>
                                    <p>Feels like {item.feels}km</p>
                                    <p>Wind {item.wind}mps</p>
                                </div>
                            </div>
                        </div>
                    )}
                </ReactCardCarousel>
            </div>
        </>
    );
};

export default Carousel;