import { API } from "../../http/API";
import { useState } from "react";
import { Beer } from "../../models/Beer";


export default function BeerService() {
    const [beer, setBeers] = useState<Beer>();



    const getRandBeer = async () => {
        const response = await API.get<Beer>('/random_beer');
        setBeers(response.data);
    }


    return { beer, getRandBeer };
}
