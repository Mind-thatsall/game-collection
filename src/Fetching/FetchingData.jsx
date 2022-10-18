import React, { useState } from "react";
const AppContext = React.createContext();

const GamesContext = ({ children }) => {
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchGames = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.rawg.io/api/games?key=${
					import.meta.env.VITE_API_KEY
				}&page=1`
			);
			const data = await res.json();

			if (data) {
				setGames(data.results);
			} else {
				setGames([]);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<AppContext.Provider
			value={{
				loading,
				games,
				fetchGames,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, GamesContext };
