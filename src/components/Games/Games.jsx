import { useContext, useEffect } from "react";
import Game from "../Game/Game";
import { AppContext } from "../../Fetching/FetchingData";

const Games = () => {
	const { games, fetchGames } = useContext(AppContext);

	useEffect(() => {
		fetchGames();
	}, []);

	console.log(games);

	return (
		<>
			{games.map((game) => {
				return game.name;
			})}
		</>
	);
};

export default Games;
