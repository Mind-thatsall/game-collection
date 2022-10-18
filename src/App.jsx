import { Route, Routes } from "react-router-dom";
import { Home, Navbar, NoMatches, Games } from "./components/Components";
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
			</Routes>
		</GamesContext>
	);
}

export default App;
