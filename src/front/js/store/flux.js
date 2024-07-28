const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			characters: [],
			planets: [],
			vehicles: [],
			favorites: [],
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

			addFavorite: (favorite) => {
				const store = getStore();
				const newFavorites = [...store.favorites, favorite];
				setStore({ favorites: newFavorites });
			},

			removeFavorite: (uid) => {
				const store = getStore();
				const newFavorites = store.favorites.filter(fav => fav.uid !== uid);
				setStore({ favorites: newFavorites });
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};


export default getState;