import { useContext, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import { AppContext } from "../../Fetching/FetchingData";
import "./Games.scss";

const Games = () => {
	const { games, fetchGames } = useContext(AppContext);

	useEffect(() => {
		fetchGames();
	}, []);

	console.log(games);

	return (
		<div className="page Games">
			<div className="sidebar">
				<h1 className="genreTitle">All Games</h1>
				<h1 className="genreTitle">Platforms</h1>
				<ul className="list">
					<li>Xbox</li>
					<li>PC</li>
					<li>Playstation</li>
				</ul>
				<h1 className="genreTitle">Genres</h1>
				<ul className="list">
					<li>Action</li>
					<li>Adventure</li>
					<li>Shooter</li>
					<li>RPG</li>
					<li>Indie</li>
					<li>Platformer</li>
					<li>Racing</li>
					<li>Sports</li>
				</ul>
			</div>
			<div className="games__wrapper">
				{games.map((game, index) => {
					return <GameCard key={index} {...game} />;
				})}
			</div>
		</div>
	);
};

export default Games;
