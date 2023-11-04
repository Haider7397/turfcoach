import { IWeater } from "Models/Weather/IWeater";

export interface ICity {
    id:number,
    name:string,
    weather:IWeater[],
    favourite:boolean,
    image:string
} 