import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

export const Card = ({ name, uid, type }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Verificamos la carga de favoritos al montar el componente
        if (store.user) {
            actions.loadFavorites();
        }
    }, [store.user, actions]);

    const handleAddFavoriteClick = async () => {
        try {
            const success = await actions.addFavorite({ type, uid });
            if (success) {
                console.log("Favorite added successfully");
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };

    const handleRemoveFavoriteClick = async () => {
        try {
            const favoriteData = { type, uid };
            if (type === 'characters') favoriteData.character_id = uid;
            else if (type === 'planets') favoriteData.planet_id = uid;
            else if (type === 'vehicles') favoriteData.vehicle_id = uid;
    
            const success = await actions.removeFavorite(favoriteData);
            if (success) {
                console.log("Favorite removed successfully");
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };
    

    return (
        <div className="singlecard">
            <figure className="card-img-top">
                <img src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`} alt={name} />
            </figure>
            <figcaption>{name}</figcaption>
            <div className="card-body">
                <h1 className="card-title">{name}</h1>
                <p className="card-text">Star Wars: The Force unites Jedi and Sith in an eternal struggle of light versus dark across planets and starships.</p>
                <Link to={`/details/${type}/${uid}`} className="btn btn-light cardbtn">Learn More!</Link>
                <button className="btn btn-light amarillo cardbtn" onClick={handleAddFavoriteClick}>
                    ★
                </button>
                <button className="btn btn-light rojo cardbtn" onClick={handleRemoveFavoriteClick}>
                ⊘
                </button>
            </div>
        </div>
    );
};
