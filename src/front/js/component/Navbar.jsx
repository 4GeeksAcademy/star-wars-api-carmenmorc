import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store } = useContext(Context);

    return (
        <nav className="navbar mb-3 p-3">
            <Link to="/">
                <img src="https://seeklogo.com/images/S/Star_Wars-logo-97DD55947B-seeklogo.com.png" style={{ width: "5rem" }} alt="Star Wars Logo" />
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle me-1 fav" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites [{store.favorites.length}]
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end mt-2">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((favorite, index) => (
                                <li key={index}>
                                    <Link 
                                        className="dropdown-item" 
                                        to={`/details/${favorite.type}/${favorite.planet_id || favorite.character_id || favorite.vehicle_id}`}
                                    >
                                        {favorite.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>
                                <span className="dropdown-item">No favorites added</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
