import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Fetching/FetchingData";

const Navbar = () => {
	const { setSearchText } = React.useContext(AppContext);
	const searchRef = React.useRef("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!(searchRef.current.value.trim().length === 0)) {
			navigate(
				`/games/search=${searchRef.current.value
					.trim()
					.toLowerCase()
					.replaceAll(" ", "-")}`
			);
		}
	};

	return (
		<navbar className="navbar__wrapper">
			<ul className="navbar__interactions">
				<Link to="/" id="link">
					<li className="logo">LOGO</li>
				</Link>
				<form onSubmit={handleSubmit}>
					<input
						type="search"
						name=""
						id=""
						className="searchBar"
						placeholder="Search"
						ref={searchRef}
					/>
				</form>
				<li>Games</li>
				<li>M</li>
			</ul>
		</navbar>
	);
};

export default Navbar;
