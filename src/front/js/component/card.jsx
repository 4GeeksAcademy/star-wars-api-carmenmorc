import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({ name, uid, type }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(store.favorites.some(fav => fav.uid === uid && fav.type === type));

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.removeFavorite(uid);
        } else {
            actions.addFavorite({ name, uid, type });
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div>
            <div className="card singlecard">
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
        </div>
    );
};