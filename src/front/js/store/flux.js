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
            ]
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
                    console.log("Response status: ", response.status);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const result = await response.json();
                    console.log("Fetched data: ", result);
                    const [characters, planets, vehicles] = result.data;
                    setStore({
                        characters,
                        planets,
                        vehicles
                    });
                    console.log("Store after fetch: ", getStore());
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            },

            addFavorite: async (favorite) => {
                const store = getStore();
                const userId = store.user ? store.user.id : null;
                if (!userId) {
                    console.error("No user logged in");
                    return;
                }
                
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/add_favorite/${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(favorite)
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ favorites: [...store.favorites, data.data] });
                    } else {
                        console.error("Failed to add favorite");
                    }
                } catch (error) {
                    console.error("Error adding favorite:", error);
                }
            },

            removeFavorite: async (uid) => {
                const store = getStore();
                const userId = store.user ? store.user.id : null;
                if (!userId) {
                    console.error("No user logged in");
                    return;
                }

                const favorite = store.favorites.find(fav => fav.uid === uid);
                if (!favorite) return;

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/delete_favorite/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ favorite_id: favorite.id })
                    });
                    if (response.ok) {
                        setStore({ favorites: store.favorites.filter(fav => fav.id !== favorite.id) });
                    } else {
                        console.error("Failed to remove favorite");
                    }
                } catch (error) {
                    console.error("Error removing favorite:", error);
                }
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password }) // Usar 'email'
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
        }
    };
};

export default getState;
