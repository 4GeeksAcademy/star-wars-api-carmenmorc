import React, { useEffect, useState } from 'react';

export const Favorites = ({ user }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/favorites/${user.id}`);
            if (response.ok) {
                const data = await response.json();
                setFavorites(data.favorites);
            }
        };

        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const handleRemoveFavorite = async (favoriteId) => {
        const response = await fetch(`${process.env.BACKEND_URL}/delete_favorite/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favorite_id: favoriteId })
        });

        if (response.ok) {
            setFavorites(favorites.filter(fav => fav.id !== favoriteId));
        }
    };

    return (
        <div>
            <h1>Favorites</h1>
            <ul>
                {favorites.map(favorite => (
                    <li key={favorite.id}>
                        {favorite.planet_id && <span>Planet ID: {favorite.planet_id}</span>}
                        {favorite.character_id && <span>Character ID: {favorite.character_id}</span>}
                        {favorite.vehicle_id && <span>Vehicle ID: {favorite.vehicle_id}</span>}
                        <button onClick={() => handleRemoveFavorite(favorite.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

