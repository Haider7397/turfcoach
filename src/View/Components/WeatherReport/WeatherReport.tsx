import { ICity } from "Models"
import "View/Styles/weatherreport.css"
import { Subject } from "rxjs"

export interface IWeatherReportProps {
    city: ICity,
    onFavourite$:Subject<number>
}

export const WeatherReport = ({ city, onFavourite$ }: IWeatherReportProps) => {

    const today = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' });
    const formattedDate = formatter.format(today);

    return (
        <div className="forecast-table">
            <div className="container">
                <div className="forecast-container">
                    {
                        city.weather.map((item, index) => {
                            return index === 0 ? <div className="today forecast" key={index}>
                                <div className="forecast-header">
                                    <div className="day">{item.day}</div>
                                    <div className="date">{formattedDate}</div>
                                </div>
                                <div className="forecast-content">
                                    <div className="forecast-city">
                                        <div className="location">{city.name}</div>
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={city.favourite?"#865305":"none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={city.favourite?"#865305":"currentColor"} className="forecast-fav" onClick={()=>onFavourite$.next(city.id)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="degree">
                                        <div className="num">{item.temperature}<sup>o</sup>C</div>
                                        <div className="forecast-icon marginIcon">
                                            <img src={item.icon} alt="" className="forecast-image" />
                                        </div>
                                    </div>
                                    <span><img src="images/humidity.png" alt="" className="forecast-imageIcon" />{item.humidity}</span>
                                    <span><img src="images/wind.png" alt="" className="forecast-imageIcon" />{item.wind}</span>
                                    <span><img src="images/precipitation.png" alt="" className="forecast-imageIcon" />{item.precipitation}</span>
                                </div>
                            </div> :
                                <div className="forecast" key={index}>
                                    <div className="forecast-header forecast-header-padding">
                                        <div className="day">{item.day}</div>
                                    </div>
                                    <div className="forecast-content forecast-content-padding">
                                        <div className="forecast-icon">
                                            <img src={item.icon} alt="" className="forecast-restweek" />
                                        </div>
                                        <div className="degree">{item.temperature}<sup>o</sup>C</div>
                                        <small>{item.dropTo}<sup>o</sup></small>
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}