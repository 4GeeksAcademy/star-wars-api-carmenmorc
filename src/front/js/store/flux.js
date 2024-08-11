const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            characters: [],
            planets: [],
            vehicles: [],
            favorites: [],
            user: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            peopleDetails: null,
            vehiclesDetails: null,
            planetsDetails: null
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            fetchAllData: async () => {
                try {
                    console.log("Fetching data...");
                    const response = await fetch(process.env.BACKEND_URL + "/api/everything");
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const result = await response.json();
                    const [characters, planets, vehicles] = result.data;
                    setStore({
                        characters,
                        planets,
                        vehicles
                    });
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            },

            addFavorite: async ({ type, uid }) => {
                const store = getStore();
                const userId = store.user ? store.user.id : null;

                if (!userId) {
                    console.error("No user logged in");
                    return false;
                }

                let favoriteData = {};
                if (type === 'characters') favoriteData.character_id = uid;
                else if (type === 'planets') favoriteData.planet_id = uid;
                else if (type === 'vehicles') favoriteData.vehicle_id = uid;

                try {
                    console.log("Adding favorite:", favoriteData);
                    const response = await fetch(`${process.env.BACKEND_URL}/api/add_favorite/${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(favoriteData)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ favorites: [...store.favorites, data.data] });
                        return true;
                    } else {
                        console.error("Failed to add favorite", response.status);
                        return false;
                    }
                } catch (error) {
                    console.error("Error adding favorite:", error);
                    return false;
                }
            },

            removeFavorite: async (favorite) => {
                const store = getStore();
                const userId = store.user ? store.user.id : null;
            
                if (!userId) {
                    console.error("No user logged in");
                    return false;
                }
            
                try {
                    console.log("Removing favorite:", favorite);
                    let favoriteData = {};
                    if (favorite.character_id) favoriteData.character_id = favorite.character_id;
                    if (favorite.planet_id) favoriteData.planet_id = favorite.planet_id;
                    if (favorite.vehicle_id) favoriteData.vehicle_id = favorite.vehicle_id;
            
                    const response = await fetch(`${process.env.BACKEND_URL}/api/delete_favorite/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(favoriteData)
                    });
            
                    if (response.ok) {
                        setStore({
                            favorites: store.favorites.filter(
                                fav =>
                                    fav.character_id !== favorite.character_id &&
                                    fav.planet_id !== favorite.planet_id &&
                                    fav.vehicle_id !== favorite.vehicle_id
                            )
                        });
                        return true;
                    } else {
                        console.error("Failed to remove favorite", response.status);
                        return false;
                    }
                } catch (error) {
                    console.error("Error removing favorite:", error);
                    return false;
                }
            },
            
            loadFavorites: async () => {
                const store = getStore();
                const userId = store.user ? store.user.id : null;

                if (!userId) {
                    console.error("No user logged in");
                    return;
                }

                try {
                    console.log("Loading favorites for user ID:", userId);
                    const response = await fetch(`${process.env.BACKEND_URL}/api/get_favorites/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ favorites: data.favorites });
                    } else {
                        console.error("Failed to load favorites", response.status);
                    }
                } catch (error) {
                    console.error("Error loading favorites:", error);
                }
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ user: data.user });
                        localStorage.setItem("user", JSON.stringify(data.user));
                        return true;
                    } else {
                        console.error("Login failed with status:", response.status);
                        return false;
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    return false;
                }
            },

            getPeopleDetails: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/character/${id}`);
                    if (response.ok) {
                        const result = await response.json();
                        console.log("People Details:", result.data); // Agrega este log
                        setStore({
                            peopleDetails: result.data
                        });
                    } else {
                        console.error("Failed to fetch people details:", result.msg);
                    }
                } catch (error) {
                    console.error("Error fetching people details:", error);
                }
            },

            getVehiclesDetails: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/vehicles/${id}`);
                    if (response.ok) {
                        const result = await response.json();
                        setStore({
                            vehiclesDetails: result.data
                        });
                    } else {
                        console.error("Failed to fetch vehicle details:", result.msg);
                    }
                } catch (error) {
                    console.error("Error fetching vehicle details:", error);
                }
            },

            getPlanetsDetails: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/planets/${id}`);
                    if (response.ok) {
                        const result = await response.json();
                        setStore({
                            planetsDetails: result.data
                        });
                    } else {
                        console.error("Failed to fetch planet details:", result.msg);
                    }
                } catch (error) {
                    console.error("Error fetching planet details:", error);
                }
            },
        }
    };
};

export default getState;
