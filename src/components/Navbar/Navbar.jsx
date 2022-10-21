import React from "react";
import "./Navbar.scss";

const Navbar = () => {
	return (
		<navbar className="navbar__wrapper">
			<ul className="navbar__interactions">
				<li className="logo">LOGO</li>
				<input
					type="search"
					name=""
					id=""
					className="searchBar"
					placeholder="Search"
				/>
				<li>Games</li>
				<li>M</li>
			</ul>
		</navbar>
	);
};

export default Navbar;
