import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "../pages/sign-in/sign-in.page";
import SignUp from "../pages/sign-up/sign-up.page";
import Dashboard from "../pages/dashboard/dashboard.page";
import Blog from "../pages/blog/blog.page";
import { Box } from "@mui/material";
import NavBar, { DrawerHeader } from "../components/navigation/navigation.component";
import CssBaseline from '@mui/material/CssBaseline';


interface IRouteNavigation {
	id: number;
	path: string;
	page: () => JSX.Element;
}

export enum Routes {
	SIGN_IN = "/sign-in",
	SIGN_UP = "/sign-up",
	DASHBOARD = "/dashboard",
	BLOG = "/blog",
}

const routeNavigation: IRouteNavigation[] = [
	{
		id: 1,
		path: Routes.SIGN_IN,
		page: SignIn,
	},
	{
		id: 2,
		path: Routes.SIGN_UP,
		page: SignUp,
	},
	{
		id: 3,
		path: Routes.DASHBOARD,
		page: Dashboard,
	},
	{
		id: 3,
		path: Routes.BLOG,
		page: Blog,
	},
];

const RoutePaths = (props: any) => (
	<BrowserRouter>
		<Switch>
			{routeNavigation.map((route) =>
				props.isUserLoggedIn ? (
					<Route key={route.id} path={route.path} exact>
						<Box sx={{ display: "flex" }}>
            <CssBaseline />
						<NavBar />
							<Box component="main" sx={{ flexGrow: 1 }}>
								<DrawerHeader />
								<route.page />
							</Box>
						</Box>
					</Route>
				) : (
					<Route
						key={route.id}
						path={route.path}
						component={route.page}
						exact
					></Route>
				)
			)};
		</Switch>
	</BrowserRouter>
);

export default RoutePaths;
