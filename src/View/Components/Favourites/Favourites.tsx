import { ICity } from "Models";
import "View/Styles/favourites.css";
import { Subject } from "rxjs";

export interface IFavouritesProps {
    favourites: ICity[],
    onRemoveFavourite$: Subject<number>
}

export const Favourites = ({ favourites, onRemoveFavourite$ }: IFavouritesProps) => {

    const today = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' });
    const formattedDate = formatter.format(today);

    return (
        <div className="favourite-table">
            <div className="container">
                <h1 className="favourite-title">Favourite Cities</h1>
                {
                    favourites.map((city, index) => {
                        return <div className="favourite-container" key={index} style={{ backgroundImage: `url(${city.image})` }}>
                            <div className="today favourite">
                                {
                                    city.weather.map((item, ind) => {
                                        return ind === 0 ? <div key={ind}>
                                            <div className="favourite-header">
                                                <div className="day">{item.day}</div>
                                                <div className="date">{formattedDate}</div>
                                            </div>
                                            <div className="favourite-content">
                                                <div className="location">{city.name} <span><svg data-testid="favorite-svg" xmlns="http://www.w3.org/2000/svg" fill={city.favourite ? "#865305" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={city.favourite ? "#865305" : "currentColor"} className="forecast-fav" onClick={() => onRemoveFavourite$.next(city.id)}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg></span></div>
                                                <div className="degree">
                                                    <div className="num">{item.temperature}<sup>o</sup>C</div>
                                                    <div className="favourite-icon marginIcon">
                                                        <img src={item.icon} alt="" className="favourite-image" />
                                                    </div>
                                                </div>
                                                <span><img src="images/humidity.png" alt="" className="favourite-imageIcon" />{item.humidity}</span>
                                                <span><img src="images/wind.png" alt="" className="favourite-imageIcon" />{item.wind}</span>
                                                <span><img src="images/precipitation.png" alt="" className="favourite-imageIcon" />{item.precipitation}</span>
                                            </div>
                                        </div> : null
                                    })
                                }
                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    )
}