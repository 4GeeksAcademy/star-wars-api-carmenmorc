import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

export const Card = ({ name, uid, type }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        console.log("Current store favorites:", store.favorites); // Log para verificar el estado del store
        const checkFavoriteStatus = () => {
            const favorite = store.favorites.find(fav => fav.uid === uid && fav.type === type);
            setIsFavorite(!!favorite);
        };
    
        if (store.favorites) {
            checkFavoriteStatus();
        }
    }, [store.favorites, uid, type]);
    

    const handleFavoriteClick = async () => {
        try {
            if (isFavorite) {
                // Encontrar el ID del favorito que se debe eliminar
                const favoriteToRemove = store.favorites.find(fav => fav.uid === uid && fav.type === type);
                if (favoriteToRemove) {
                    await actions.removeFavorite(favoriteToRemove.id);
                }
            } else {
                const favoriteData = { type, uid };
                if (type === 'characters') favoriteData.character_id = uid;
                else if (type === 'planets') favoriteData.planet_id = uid;
                else if (type === 'vehicles') favoriteData.vehicle_id = uid;
                await actions.addFavorite(favoriteData);
            }

            // Actualizar el estado local de favoritos
            setIsFavorite(prevIsFavorite => !prevIsFavorite);
        } catch (error) {
            console.error("Error handling favorite:", error);
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
                <button className="btn btn-light amarillo cardbtn" onClick={handleFavoriteClick}>
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
        </div>
    );
};
