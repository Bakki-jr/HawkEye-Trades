import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {
	IUserSetup,
	routeNavigation,
	Routes,
} from "../../constants/route-paths";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar, { DrawerHeader } from "../navigation/navigation.component";
import PageNotFound from "../page-not-found/page-not-found.component";

interface IProtectedRoute {
	[x: string]: any;
	component: any;
	isRouteToBeProtected: boolean;
}

const RoutePaths = ({ isUserLoggedIn, darkMode, setDarkMode }: IUserSetup) => {
	return (
		<BrowserRouter>
			<Switch>
				{routeNavigation.map((route) =>
					isUserLoggedIn && route.isRouteToBeProtected ? (
						<Route key={route.id} path={route.path} exact>
							<Box sx={{ display: "flex" }}>
								<CssBaseline />
								<NavBar {...{ darkMode, setDarkMode }} />
								<Box
									component="main"
									sx={{ flexGrow: 1, position: "relative" }}
								>
									<DrawerHeader />
									<route.page />
								</Box>
							</Box>
						</Route>
					) : (
						<ProtectedRoute
							key={route.id}
							path={route.path}
							exact
							component={route.page}
							isRouteToBeProtected={route.isRouteToBeProtected}
						/>
					)
				)}
				<Route component={PageNotFound} />
			</Switch>
		</BrowserRouter>
	);
};

const ProtectedRoute = ({
	component: Component,
	isRouteToBeProtected,
	...rest
}: IProtectedRoute) => (
	<Route
		{...rest}
		render={(routeProps) =>
			isRouteToBeProtected ? (
				<Redirect to={Routes.SIGN_IN} />
			) : (
				<Component {...routeProps} />
			)
		}
	/>
);

export default RoutePaths;
