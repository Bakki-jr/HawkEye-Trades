import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { darkTheme, lightTheme } from "./constants/theme";
import RoutePaths from "./constants/route-paths";

import "./App.css";

const App = () => {
	const [darkMode, setDarkMode] = useState(true);
	const [isUserLggedIn, setUserLoggedIn] = useState(false);

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<RoutePaths isUserLoggedIn={true}>
      </RoutePaths>
		</ThemeProvider>
	);
};
export default App;
