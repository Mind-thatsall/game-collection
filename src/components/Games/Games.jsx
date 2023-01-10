import { useContext, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import { AppContext } from "../../Fetching/FetchingData";
import { useParams } from "react-router-dom";
import "./Games.scss";
import Sidebar from "./Sidebar";

const Games = ({ type }) => {
	const {
		games,
		fetchGames,
		fetchBySearch,
		fetchByFilter,
		loading,
		setSearchText,
		setFilterText,
		fetchMore,
	} = useContext(AppContext);
	const { id } = useParams();
	const idText = id !== undefined ? id.replaceAll("-", " ") : "";
	console.log(games);

	useEffect(() => {
		setSearchText(idText);
		setFilterText(idText);
	}, [id]);

	useEffect(() => {
		switch (type) {
			case (type = "search"):
				setSearchText(idText);
				fetchBySearch();
				break;
			case (type = undefined):
				fetchGames();
				break;
			case (type = ""):
				fetchGames();
				break;
			case (type = "platforms"):
				fetchByFilter("parent_platforms");
				break;
			case (type = "genres"):
				fetchByFilter("genres");
				break;
			case (type = "tags"):
				fetchByFilter("tags");
				break;
		}
	}, [fetchByFilter, fetchBySearch, type]);

	if (loading) return "Loading...";

	return (
		<>
			<div className="page Games">
				<Sidebar />
				<div className="games__wrapper">
					{games.map((game, index) => {
						return <GameCard key={index} {...game} />;
					})}
				</div>
			</div>
			<button className="btnLoadMore" onClick={fetchMore}>
				Load More
			</button>
		</>
	);
};

export default Games;
