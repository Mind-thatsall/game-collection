import { Route, Routes } from "react-router-dom";
import {
	Home,
	Navbar,
	NoMatches,
	Games,
	GameDetails,
} from "./components/Components";
import { GamesContext } from "./Fetching/FetchingData";

function App() {
	return (
		<GamesContext>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Home /> <Games />
						</>
					}
				/>
				<Route path="*" element={<NoMatches />} />
				<Route path="/games" element={<Games type={""} />} />
				<Route path="/games/:id" element={<GameDetails />} />
				<Route path="/games/search=:id" element={<Games type={"search"} />} />
				<Route
					path="/games/platforms=:id"
					element={<Games type={"platforms"} />}
				/>
				<Route path="/games/genres=:id" element={<Games type={"genres"} />} />
				<Route path="/games/tags=:id" element={<Games type={"tags"} />} />
			</Routes>
		</GamesContext>
	);
}

export default App;
