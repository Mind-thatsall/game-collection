import React, { useEffect, useContext, useState } from "react";
import "./GameDetails.scss";
import { AppContext } from "../../Fetching/FetchingData";
import { useParams } from "react-router-dom";

const Age = ({ age }) => {
	let ageNumber;

	switch (age) {
		case "Mature":
			ageNumber = "17+";
			break;
		case "Teen":
			ageNumber = "13+";
			break;
		case "Everyone 10+":
			ageNumber = "10+";
			break;
		case "Everyone":
			ageNumber = "0+";
			break;
		case "?":
			ageNumber = "?";
			break;
	}

	return <h1 className="bigInfo">{ageNumber}</h1>;
};

const GameDetails = () => {
	const { gameDetails, fetchGameDetails } = useContext(AppContext);
	const { id } = useParams();

	useEffect(() => {
		fetchGameDetails(id);
	}, []);

	const Requirements = ({ requirements }) => {
		if (requirements?.recommended) {
			return (
				<span className="levelRequire">
					{requirements?.minimum}
					{"\n\n"}
					{requirements?.recommended}
				</span>
			);
		} else if (requirements?.minimum) {
			return <span className="levelRequire">{requirements?.minimum}</span>;
		} else {
			return <span>No requirements found</span>;
		}
	};

	return (
		<div className="page GameDetails">
			<div className="container">
				<div className="Characteristics">
					<div className="first-column">
						<div className="Genre char">
							<h2 className="titleChar">Genres</h2>
							<span>{gameDetails?.genres.join(", ")}</span>
						</div>
						<div className="ReleaseDate char">
							<h2 className="titleChar">Release Date</h2>
							<span>{gameDetails?.releasedDate}</span>
						</div>
						<div className="Platforms char">
							<h2 className="titleChar">Platforms</h2>
							<span>
								{gameDetails?.platforms
									.map((platform) => {
										return platform.name;
									})
									.join(", ")}
							</span>
						</div>
					</div>
					<div className="second-column">
						<div className="Developer char">
							<h2 className="titleChar">Developer</h2>
							<span>{gameDetails?.developers.join(", ")}</span>
						</div>
						<div className="Publisher char">
							<h2 className="titleChar">Publisher</h2>
							<span>{gameDetails?.publishers.join(", ")}</span>
						</div>
					</div>
				</div>
				<div className="Age">
					<h2 className="titleChar">Age</h2>
					<Age age={gameDetails?.age} />
				</div>
				<div className="Metascore">
					<h2 className="titleChar">Metascore</h2>
					<h1 className="bigInfo MetaScore">{gameDetails?.score}</h1>
				</div>
				<div className="Photos">
					<img
						src={gameDetails?.bgImage}
						alt="Game Picture"
						className="gamePicture"
					/>
				</div>
				<div className="Description">
					<h2 className="titleChar">Description</h2>
					<p className="descContent">{gameDetails?.description}</p>
				</div>
				<div className="Requirements">
					<h2 className="titleChar">System requirements for PC</h2>
					<Requirements requirements={gameDetails?.requirementsPC} />
				</div>
				<div className="Tags">
					<h2 className="titleChar">Tags</h2>
					<span className="tags__wrapper">
						{gameDetails?.tags.map((tag) => {
							return <span className="tag">{tag.name}</span>;
						})}
					</span>
				</div>
			</div>
		</div>
	);
};

export default GameDetails;
