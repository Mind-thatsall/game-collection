import React, { useState, useCallback } from "react";
const AppContext = React.createContext();

const GamesContext = ({ children }) => {
	const [games, setGames] = useState([]);
	const [gameDetails, setGameDetails] = useState();
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [filterText, setFilterText] = useState("");
	const [page, setPage] = useState(2);

	const fetchGames = async () => {
		setLoading(true);
		try {
			setPage(2);
			const res = await fetch(
				`https://api.rawg.io/api/games?key=${
					import.meta.env.VITE_API_KEY
				}&page=1`,
				{
					mode: "cors",
				}
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

	const fetchMore = async () => {
		try {
			setPage(page + 1);
			const res = await fetch(
				`https://api.rawg.io/api/games?key=
				${import.meta.env.VITE_API_KEY}
				&page=${page}`
			);
			const data = await res.json();

			let allGames = data.results;

			if (data) {
				setGames((oldGames) => [...oldGames, ...allGames]);
				i++;
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
			setLoading(true);
			setGames([]);
			try {
				let fetchPlatform = "";

				switch (filterText) {
					case "pc":
						fetchPlatform = "1";
						break;
					case "xbox":
						fetchPlatform = "3";
						break;
					case "playstation":
						fetchPlatform = "2";
						break;
					default:
						fetchPlatform = "";
						break;
				}

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
				fetchMore,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, GamesContext };
