import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./constants/theme";
import { SnackbarProvider } from "notistack";

import "./App.css";
import { onAuthStateChanged } from "@firebase/auth";
import { authInstance, isUserExists } from "./features/firebase/auth";
import {
	useAppDispatch,
	useAppSelector,
} from "./features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { fetchUser } from "./features/redux/slice/user.slice";
import Spinner from "./components/spinner/spinner.component";
import RoutePaths from "./components/route/route.component";
import { setUserStatus } from "./features/redux/slice/login.slice";

const App = () => {
	const [darkMode, setDarkMode] = useState<boolean>(true);
	const isUserLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
	const userUid = useAppSelector((state) => state.user.uid);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const authSubscription = onAuthStateChanged(authInstance, async (user) => {
			if (user) {
				const isUserAvailable = await isUserExists(user.uid);
				if (isUserAvailable) {
					const fetchedUser: any = await dispatch(fetchUser(user.uid));
					dispatch(setUserStatus(fetchedUser?.payload?.uid ? true : false));
				}
			} else {
				dispatch(setUserStatus(userUid ? true : false));
			}
		});
		const isDarkModeEnabled =
			localStorage.getItem("theme") === "light" ? false : true;
		setDarkMode(isDarkModeEnabled);
		return authSubscription;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const app = (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			{isUserLoggedIn != null ? (
				<SnackbarProvider maxSnack={1}>
					<RoutePaths {...{ darkMode, setDarkMode }}></RoutePaths>
				</SnackbarProvider>
			) : (
				<Spinner isLoading={true} />
			)}
		</ThemeProvider>
	);
	return app;
};
export default App;
