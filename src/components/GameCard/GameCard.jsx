import React from "react";
import "./GameCard.scss";
import Xbox from "../../assets/Xbox.svg";
import Playstation from "../../assets/Playstation.svg";
import PCLogo from "../../assets/PC.svg";
import Linux from "../../assets/Linux.svg";
import iOS from "../../assets/IOS.svg";
import Android from "../../assets/Android.svg";
import Nintendo from "../../assets/Nintendo.svg";
import Apple from "../../assets/Apple.svg";
import { Link } from "react-router-dom";

const Platform = (platform) => {
	let platformLogo;

	switch (platform.name) {
		case "Xbox":
			platformLogo = Xbox;
			break;
		case "Linux":
			platformLogo = Linux;
			break;
		case "Apple Macintosh":
			platformLogo = Apple;
			break;
		case "PlayStation":
			platformLogo = Playstation;
			break;
		case "iOS":
			platformLogo = iOS;
			break;
		case "Android":
			platformLogo = Android;
			break;
		case "Nintendo":
			platformLogo = Nintendo;
			break;
		case "PC":
			platformLogo = PCLogo;
			break;
	}

	return <img className="platform" src={platformLogo} alt={platform.name} />;
};

function getColor(value) {
	var hue = ((1 - value) * 120).toString(10);
	return ["hsl(", hue, ",100%,35%)"].join("");
}

const GameCard = (game) => {
	const isLongName =
		game.name.length > 21 ? "14px" : game.name.length > 12 ? "20px" : "24px";

	return (
		<Link to={`/games/${game.slug}`} className="gamecard__wrapper" id="link">
			<img src={game.background_image} alt="" className="thumbnail" />
			<div className="gamecard__informations">
				<div className="platforms__metacritic">
					<span className="platforms">
						{game.parent_platforms !== undefined
							? game.parent_platforms.map((platform) => {
									return <Platform {...platform.platform} />;
							  })
							: ""}
					</span>
					{game.metacritic === null ? (
						<span></span>
					) : (
						<span
							className="metacritic"
							style={{
								color: getColor(-game.metacritic / 100 + 1),
								borderColor: getColor(-game.metacritic / 100 + 1),
							}}>
							{game.metacritic}
						</span>
					)}
				</div>
				<h2 className="game_title" style={{ fontSize: isLongName }}>
					{game.name}
				</h2>
				<div className="genres">
					{game.genres.slice(0, 3).map((genre, index) => {
						return (
							<span key={index} className="genre">
								{genre.name}
							</span>
						);
					})}
				</div>
			</div>
		</Link>
	);
};

export default GameCard;
