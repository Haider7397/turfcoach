import { ICity } from "Models"
import { Banner, Favourites, WeatherReport } from "View/Components"
import { PageLayout } from "View/Layout"
import { useEffect, useRef, useState } from "react"
import { Subject } from "rxjs"
import { data } from "./data/cities"


export const HomePage = () =>{

    const onClick$ = useRef(new Subject<string>()).current;
    const onFavourite$ = useRef(new Subject<number>()).current;
    const onRemoveFavourite$ = useRef(new Subject<number>()).current;
    const [cities, setCities] = useState<ICity[]>(data);
    const [city, setCity] = useState<ICity>(data[0]);
    const [favourites, setFavourites] = useState<ICity[]>([data[1]]);
    const [backgroundImage, setBackgoundImage] = useState<string>(data[0].image);

    useEffect(() => {
        cities.forEach((city) => {
          const today = new Date();
          const currentDayIndex = today.getDay();
          const beforeToday = city.weather.slice(0, currentDayIndex);
          const afterToday = city.weather.slice(currentDayIndex);
          city.weather = afterToday.concat(beforeToday);
        });
        setCities(cities)
        setCity(cities[0])
        setFavourites([cities[1]])
        setBackgoundImage(cities[0].image)
      }, []);

    useEffect(()=>{
        const subscription = onClick$.subscribe((val:string)=>{
            const searchedCity = cities.find(city => {
                return city.name.toLowerCase() === val.toLowerCase();
            });
            searchedCity && setCity(searchedCity) 
            searchedCity && setBackgoundImage(searchedCity.image)
        })

        return () => subscription.unsubscribe()
    },[onClick$])

    useEffect(()=>{
        const subscription = onFavourite$.subscribe((val:number)=>{
            cities.forEach(city => {
                if(city.id === val){
                    city.favourite=!city.favourite   
                }
            });
            const searchedCity = cities.find(city => {return city.id === val});
            if(searchedCity){
                setCity(searchedCity)
                const searchFavourites = favourites.find(city => {return city.id === val})
                if(searchFavourites){
                    setFavourites((prevVal) => prevVal.filter((city) => city !== searchFavourites));
                }else{
                   setFavourites((prevVal)=>[...prevVal,searchedCity])
                }
            }
        })

        return () => subscription.unsubscribe()
    },[onFavourite$,favourites])

    useEffect(()=>{
        const subscription = onRemoveFavourite$.subscribe((val:number)=>{
            setFavourites((prevVal) => prevVal.filter((city) => city.id !== val));
        })

        return () => subscription.unsubscribe()
    },[onRemoveFavourite$,favourites])


    return(
        <PageLayout>
            <Banner cities={cities} onClick$={onClick$} backgroundImage={backgroundImage}/>
            <WeatherReport city={city} onFavourite$={onFavourite$}/>
            <Favourites favourites={favourites} onRemoveFavourite$={onRemoveFavourite$}/>
        </PageLayout>
    )
}