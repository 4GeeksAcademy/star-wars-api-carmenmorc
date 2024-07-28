import React, { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/details.css";

export const Details = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/characters')) {
            actions.getPeopleDetails(uid);
        } else if (location.pathname.includes('/vehicles')) {
            actions.getVehiclesDetails(uid);
        } else if (location.pathname.includes('/planets')) {
            actions.getPlanetsDetails(uid);
        }
    }, [uid, location.pathname, actions]);

    const renderDetails = () => {
        if (location.pathname.includes('/characters') && store.peopleDetails) {
            return (
                <div>
                    <div className="container d-flex photodesc">
                        <div>
                            <figure>
                                <img src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} alt={store.peopleDetails.properties.name} />
                                <figcaption>{store.peopleDetails.properties.name}</figcaption>
                            </figure>
                        </div>
                        <p>In the epic saga of Star Wars, the Force binds the galaxy together, weaving through the destinies of Jedi and Sith alike. Across the vast expanse of space, planets teem with life, from the desert sands of Tatooine to the lush forests of Endor. Lightsabers ignite in thrilling duels between heroes and villains, while starships soar through the cosmos, carrying rebels and empires into battle. Amidst the interstellar conflict, droids beep and hum with loyalty, and the wise guidance of Yoda echoes through generations. In the eternal struggle between light and dark, the Skywalker legacy spans across generations, shaping the very fabric of a galaxy far, far away.</p>
                    </div>
                    <div className="container d-flex attributes">
                        <div>
                            <h1>Name</h1>
                            <p>{store.peopleDetails.properties.name}</p>
                        </div>
                        <div>
                            <h1>Birth Year</h1>
                            <p>{store.peopleDetails.properties.birth_year}</p>
                        </div>
                        <div>
                            <h1>Gender</h1>
                            <p>{store.peopleDetails.properties.gender}</p>
                        </div>
                        <div>
                            <h1>Height</h1>
                            <p>{store.peopleDetails.properties.height}</p>
                        </div>
                        <div>
                            <h1>Skin Color</h1>
                            <p>{store.peopleDetails.properties.skin_color}</p>
                        </div>
                        <div>
                            <h1>Eye Color</h1>
                            <p>{store.peopleDetails.properties.eye_color}</p>
                        </div>
                    </div>
                </div>
            );
        } else if (location.pathname.includes('/vehicles') && store.vehiclesDetails) {
            return (
                <div>
                    <div className="container d-flex photodesc">
                        <div>
                            <figure>
                                <img src={`https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`} alt={store.vehiclesDetails.properties.name} />
                                <figcaption>{store.vehiclesDetails.properties.name}</figcaption>
                            </figure>
                        </div>
                        <p>In the epic saga of Star Wars, the Force binds the galaxy together, weaving through the destinies of Jedi and Sith alike. Across the vast expanse of space, planets teem with life, from the desert sands of Tatooine to the lush forests of Endor. Lightsabers ignite in thrilling duels between heroes and villains, while starships soar through the cosmos, carrying rebels and empires into battle. Amidst the interstellar conflict, droids beep and hum with loyalty, and the wise guidance of Yoda echoes through generations. In the eternal struggle between light and dark, the Skywalker legacy spans across generations, shaping the very fabric of a galaxy far, far away.</p>
                    </div>
                    <div className="container d-flex attributes">
                        <div>
                            <h1>Name</h1>
                            <p>{store.vehiclesDetails.properties.name}</p>
                        </div>
                        <div>
                            <h1>Model</h1>
                            <p>{store.vehiclesDetails.properties.model}</p>
                        </div>
                        <div>
                            <h1>Passengers</h1>
                            <p>{store.vehiclesDetails.properties.passengers}</p>
                        </div>
                        <div>
                            <h1>Cargo Capacity</h1>
                            <p>{store.vehiclesDetails.properties.cargo_capacity}</p>
                        </div>
                        <div>
                            <h1>Consumables</h1>
                            <p>{store.vehiclesDetails.properties.consumables}</p>
                        </div>
                        <div>
                            <h1>Manufacturer</h1>
                            <p>{store.vehiclesDetails.properties.manufacturer}</p>
                        </div>
                    </div>
                </div>
            );
        } else if (location.pathname.includes('/planets') && store.planetsDetails) {
            return (
                <div>
                    <div className="container d-flex photodesc">
                        <div>
                            <figure>
                                <img src={`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`} alt={store.planetsDetails.properties.name} />
                                <figcaption>{store.planetsDetails.properties.name}</figcaption>
                            </figure>
                        </div>
                        <p>In the epic saga of Star Wars, the Force binds the galaxy together, weaving through the destinies of Jedi and Sith alike. Across the vast expanse of space, planets teem with life, from the desert sands of Tatooine to the lush forests of Endor. Lightsabers ignite in thrilling duels between heroes and villains, while starships soar through the cosmos, carrying rebels and empires into battle. Amidst the interstellar conflict, droids beep and hum with loyalty, and the wise guidance of Yoda echoes through generations. In the eternal struggle between light and dark, the Skywalker legacy spans across generations, shaping the very fabric of a galaxy far, far away.</p>
                    </div>

                    <div className="container d-flex attributes">
                        <div>
                            <h1>Name</h1>
                            <p>{store.planetsDetails.properties.name}</p>
                        </div>
                        <div>
                            <h1>Climate</h1>
                            <p>{store.planetsDetails.properties.climate}</p>
                        </div>
                        <div>
                            <h1>Diameter</h1>
                            <p>{store.planetsDetails.properties.diameter}</p>
                        </div>
                        <div>
                            <h1>Gravity</h1>
                            <p>{store.planetsDetails.properties.gravity}</p>
                        </div>
                        <div>
                            <h1>Population</h1>
                            <p>{store.planetsDetails.properties.population}</p>
                        </div>
                        <div>
                            <h1>Terrain</h1>
                            <p>{store.planetsDetails.properties.terrain}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>No details available</div>;
        }
    };

    return (
        <div className="container">
            <h1>Details</h1>
            {renderDetails()}
        </div>
    );
};