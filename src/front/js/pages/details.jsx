import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/details.css";

export const Details = () => {
    const { uid } = useParams();
    const location = useLocation();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log(`Fetching details for ${uid} in ${location.pathname}`);
        if (location.pathname.includes('/characters')) {
            actions.getPeopleDetails(uid);
        } else if (location.pathname.includes('/vehicles')) {
            actions.getVehiclesDetails(uid);
        } else if (location.pathname.includes('/planets')) {
            actions.getPlanetsDetails(uid);
        }
    }, [uid, location.pathname, actions]);

    const renderDetails = () => {
        let details = {};
        let imagePath = "";
        let attributes = [];

        if (location.pathname.includes('/characters')) {
            details = store.peopleDetails;
            imagePath = `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
            attributes = ["Height", "Mass", "Hair Color", "Skin Color", "Eye Color"];
        } else if (location.pathname.includes('/vehicles')) {
            details = store.vehiclesDetails;
            imagePath = `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
            attributes = ["Model", "Manufacturer", "Crew", "Passengers", "Vehicle Class"];
        } else if (location.pathname.includes('/planets')) {
            details = store.planetsDetails;
            imagePath = `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
            attributes = ["Diameter", "Climate", "Gravity", "Terrain", "Surface Water"];
        }

        return (
            <div>
                <div className="container d-flex photodesc">
                    <div>
                        <figure>
                            <img src={imagePath} alt={details.name} />
                            <figcaption>{details.name}</figcaption>
                        </figure>
                    </div>
                    <p>In a galaxy far, far away, the struggle between the dark and light sides of the Force continues to captivate audiences. The iconic lightsaber duels between Jedi and Sith, like those seen in the epic battles of "The Empire Strikes Back," highlight the dynamic tension of the Star Wars universe. The Millennium Falcon, piloted by the charismatic Han Solo and his co-pilot Chewbacca, remains one of the most beloved starships, known for its legendary Kessel Run. Meanwhile, the enigmatic Yoda imparts wisdom with his cryptic phrases, while characters like Darth Vader and Emperor Palpatine embody the perennial conflict between tyranny and freedom. With each new installment, from the original trilogy to the latest series, the saga continues to explore themes of heroism, redemption, and the power of hope.</p>
                </div>
                <div className="container d-flex attributes">
                    <h1 className="details-name">{details.name}</h1>
                    {attributes.map((attr, index) => (
                        <div key={index}>
                            <h1>{attr}</h1>
                            <p>{details.characteristics[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="details">
            {store.peopleDetails || store.vehiclesDetails || store.planetsDetails ? renderDetails() : <p>Loading details...</p>}
        </div>
    );
};
