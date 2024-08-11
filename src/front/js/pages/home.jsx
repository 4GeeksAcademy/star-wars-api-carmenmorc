import React, { useContext, useEffect } from "react";
import { Card } from "../component/card.jsx";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.user) {
            navigate("/login"); 
        } else {
            actions.fetchAllData();
        }
    }, [store.user]);

    return (
        <div className="container">
            {store.user && (
                <div className="welcome-message">
                    <h1>Bienvenido {store.user.email}</h1>
                </div>
            )}
            <div className="row">
                {store.characters.map(character => (
                    <Card key={character.id} name={character.name} uid={character.id} type="characters" />
                ))}
                {store.planets.map(planet => (
                    <Card key={planet.id} name={planet.name} uid={planet.id} type="planets" />
                ))}
                {store.vehicles.map(vehicle => (
                    <Card key={vehicle.id} name={vehicle.name} uid={vehicle.id} type="vehicles" />
                ))}
            </div>
        </div>
    );
};
