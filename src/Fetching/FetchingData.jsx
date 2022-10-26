import React, { useState, useCallback } from "react";
const AppContext = React.createContext();

const GamesContext = ({ children }) => {
	const [games, setGames] = useState([]);
	const [gameDetails, setGameDetails] = useState();
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [filterText, setFilterText] = useState("");

	const fetchGames = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.rawg.io/api/games?key=${
					import.meta.env.VITE_API_KEY
				}&page=3`
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

	const fetchBySearch = useCallback(async () => {
		setLoading(true);
		console.log("one");
		try {
			const res = await fetch(
				`https://api.rawg.io/api/games?key=${
					import.meta.env.VITE_API_KEY
				}&search=${searchText}`
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
	}, [searchText]);

	const fetchByFilter = useCallback(
		async (filter) => {
			console.log("one");
			setLoading(true);
			setGames([]);
			try {
				let fetchPlatform = filterText;
				fetchPlatform === "pc"
					? (fetchPlatform = "1")
					: fetchPlatform === "xbox"
					? (fetchPlatform = "3")
					: fetchPlatform === "playstation"
					? (fetchPlatform = "2")
					: (fetchPlatform = "");

				let fetchGenres = filterText;
				fetchGenres === "rpg" ? (fetchGenres = "role-playing-games-rpg") : null;

				let fetchTags = filterText;

				const res = await fetch(
					`https://api.rawg.io/api/games?key=${
						import.meta.env.VITE_API_KEY
					}&${filter}=${
						filter === "parent_platforms"
							? fetchPlatform
							: filter === "genres"
							? fetchGenres
							: fetchTags
					}`
				);

				console.log(
					`https://api.rawg.io/api/games?key=${
						import.meta.env.VITE_API_KEY
					}&${filter}=${
						filter === "parent_platforms"
							? fetchPlatform
							: filter === "genres"
							? fetchGenres
							: fetchTags
					}`
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
		},
		[filterText]
	);

	const fetchGameDetails = async (slug) => {
		try {
			const res = await fetch(
				`https://api.rawg.io/api/games/${slug}?key=${
					import.meta.env.VITE_API_KEY
				}`
			);
			const data = await res.json();

			if (data) {
				let allGameDetails = {
					bgImage: data.background_image,
					description: data.description_raw,
					developers: data.developers.map((developer) => {
						return developer.name;
					}),
					publishers: data.publishers.map((publisher) => {
						return publisher.name;
					}),
					genres: data.genres.map((genre) => {
						return genre.name;
					}),
					name: data.name,
					platforms: data.platforms.map((platform) => {
						return {
							name: platform.platform.name,
							slug: platform.platform.slug,
						};
					}),
					score: data.metacritic,
					releasedDate: data.released,
					slug: data.slug,
					requirementsPC: data.platforms.filter(
						(platform) => platform.platform.name === "PC"
					),
					age: data.esrb_rating === null ? "?" : data.esrb_rating.name,
					tags: data.tags.map((tag) => {
						return {
							name: tag.name,
							slug: tag.slug,
						};
					}),
				};

				setGameDetails(allGameDetails);
			} else {
				setGameDetails([]);
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
				gameDetails,
				searchText,
				filterText,
				setSearchText,
				setFilterText,
				fetchGames,
				fetchGameDetails,
				fetchBySearch,
				fetchByFilter,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, GamesContext };
