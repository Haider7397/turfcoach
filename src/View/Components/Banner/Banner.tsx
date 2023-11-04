import { ICity } from "Models"
import "View/Styles/banner.css"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { Subject } from "rxjs"

export interface IBannerProps{
    cities:ICity[],
    onClick$: Subject<string>,
    backgroundImage:string
}


export const Banner = ({cities,onClick$,backgroundImage}:IBannerProps) =>{

    const [searchCities, setSearchCities] = useState<ICity[]>();
    const [value, setValue] = useState<string>("");
    const onItemClick$ = useRef(new Subject<string>()).current;
    const onFind$ = useRef(new Subject<void>()).current;

    const handleOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
            const filteredCities = cities.filter(city => {
                return city.name.toLowerCase().includes(event.target.value.toLowerCase());
            });
            setSearchCities(filteredCities)
            !event.target.value && setSearchCities([])
        },
        [cities],
    )

    useEffect(()=>{
        const subscription = onItemClick$.subscribe((val:string)=>{
            setValue(val)
            setSearchCities([])
        })

        return () => subscription.unsubscribe()
    },[onItemClick$])

    useEffect(()=>{
        const subscription = onFind$.subscribe(()=>{

            onClick$ && onClick$.next(value)
            setValue("")
            
        })

        return () => subscription.unsubscribe()
    },[onFind$,value])

    return(
            <div className="hero" style={{backgroundImage:`url("${backgroundImage}")`}}>
				<div className="container" >
                    <div className="find-location input-group">
                        <input type="text" placeholder="Find your location..." onChange={handleOnChange} value={value}/>
                        <button className="button-styling" onClick={()=>onFind$.next()} >Find</button>
                    </div>
                    {
                        searchCities && <div className="list-container">
                            <ul className="list">
                                {
                                    searchCities.map((city,index)=>{
                                        return <li className="list-item" key={index} onClick={()=>onItemClick$.next(city.name)}>
                                                    {city.name}
                                                </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
				</div>
			</div>
    )
}