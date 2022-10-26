import React from "react";
import "./Games.scss";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();

	function handleClickPlatforms(e) {
		e.preventDefault();
		navigate(`/games/platforms=${e.target.innerText.toLowerCase()}`);
	}

	function handleClickGenres(e) {
		e.preventDefault();
		navigate(`/games/genres=${e.target.innerText.toLowerCase()}`);
	}

	return (
		<div className="sidebar">
			<Link to="/games" id="link">
				<h1 className="genreTitle">All Games</h1>
			</Link>
			<h1 className="genreTitle">Platforms</h1>
			<ul className="list">
				<li>
					<button onClick={handleClickPlatforms} className="btnSidebar">
						PC
					</button>
				</li>
				<li>
					<button onClick={handleClickPlatforms} className="btnSidebar">
						Playstation
					</button>
				</li>
				<li>
					<button onClick={handleClickPlatforms} className="btnSidebar">
						Xbox
					</button>
				</li>
			</ul>
			<h1 className="genreTitle">Genres</h1>
			<ul className="list">
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Action
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Adventure
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Shooter
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						RPG
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Indie
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Platformer
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Racing
					</button>
				</li>
				<li>
					<button onClick={handleClickGenres} className="btnSidebar">
						Sports
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
