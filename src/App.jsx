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
				<Route path="/games/:id" element={<GameDetails />} />
			</Routes>
		</GamesContext>
	);
}

export default App;
