import { Route, Routes } from "react-router-dom";
import { Home, Navbar, NoMatches, Games } from "./components/Components";

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
