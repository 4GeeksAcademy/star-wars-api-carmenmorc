import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

export const Card = ({ name, uid, type }) => {
    const { store, actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(store.favorites.some(fav => fav.uid === uid && fav.type === type));

    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.uid === uid && fav.type === type));
    }, [store.favorites]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.removeFavorite(uid);
        } else {
            actions.addFavorite({ name, uid, type });
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

export const CardContainer = () => {
    const { store } = useContext(Context);

    return (
        <div className="card-container">
            {store.data.flat().map(item => (
                <Card key={item.id} name={item.name} uid={item.id} type={getType(item)} />
            ))}
        </div>
    );
};

const getType = (item) => {
    if (item.model) return 'vehicles';
    if (item.climate) return 'planets';
    return 'characters';
};
