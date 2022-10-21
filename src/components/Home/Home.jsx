import React from "react";
import "./Home.scss";
import bgDarkMode from "../../images/bgDarkMode.webp";

const Home = () => {
	return (
		<div className="page Home">
			<h1 className="title">
				Game library,{" "}
				<span className="title__secondPart">
					<span className="wordgradient">intuitive</span> for all.
				</span>
			</h1>
		</div>
	);
};

export default Home;
