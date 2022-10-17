import { useState, useEffect } from "react";
import { AppContext } from "../../fetching/FetchGames";
import Game from "../Game/Game";

const Games = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "659ed16470mshdf8cec65ed53da8p1cc4fajsn5f81d26bf375",
				"X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
			},
		};

		fetch(
			"https://free-to-play-games-database.p.rapidapi.com/api/games?q=overwatch",
			options
		)
			.then((res) => res.json())
			.then((res) => setGames(res))
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			{games.map((game, index) => {
				return <Game key={index} {...game} />;
			})}
		</>
	);
};

export default Games;
