import SignIn from "../pages/sign-in/sign-in.page";
import SignUp from "../pages/sign-up/sign-up.page";
import StocksInfo from "../pages/stocks-info/stocks-info.page";
import Blog from "../pages/blog/blog.page";
import AddBlog from "../pages/create-blog/create-blog.page";
import TradeHistory from "../pages/trade-history/trade-history.page";
import TradeJournal from "../pages/trade-journal/trade-journal.page";
import TradeInfo from "../pages/trade-info/trade-info.page";
import InfoPage from "../pages/info/info.page";
import UserProfile from "../pages/user-profile/user-profile.page";

interface IRouteNavigation {
	id: number;
	path: string;
	page: () => JSX.Element;
	isRouteToBeProtected: boolean;
}

export enum Routes {
	SIGN_IN = "/sign-in",
	SIGN_UP = "/sign-up",
	LANDING = "/",
	BLOG = "/blog",
	ADD_BLOG = "/create-blog-post",
	TRADE_HISTORY = "/trade-history",
	TRADE_JOURNAL = "/trade-journal",
	TRADE_INFO = "/trade-history/:id",
	STOCKS_INFO = "/stocks-info",
	INFO = "/info",
	USER_PROFILE = "/update-user-profile",
}

export interface IUserThemePreference {
	darkMode: boolean;
	setDarkMode: any;
}

export interface IUserSetup extends IUserThemePreference {}

export const routeNavigation: IRouteNavigation[] = [
	{
		id: 1,
		path: Routes.SIGN_IN,
		page: SignIn,
		isRouteToBeProtected: false,
	},
	{
		id: 2,
		path: Routes.SIGN_UP,
		page: SignUp,
		isRouteToBeProtected: false,
	},
	{
		id: 3,
		path: Routes.STOCKS_INFO,
		page: StocksInfo,
		isRouteToBeProtected: true,
	},
	{
		id: 4,
		path: Routes.LANDING,
		page: Blog,
		isRouteToBeProtected: true,
	},
	{
		id: 5,
		path: Routes.BLOG,
		page: Blog,
		isRouteToBeProtected: true,
	},
	{
		id: 6,
		path: Routes.ADD_BLOG,
		page: AddBlog,
		isRouteToBeProtected: true,
	},
	{
		id: 7,
		path: Routes.TRADE_HISTORY,
		page: TradeHistory,
		isRouteToBeProtected: true,
	},
	{
		id: 8,
		path: Routes.TRADE_JOURNAL,
		page: TradeJournal,
		isRouteToBeProtected: true,
	},
	{
		id: 9,
		path: Routes.TRADE_INFO,
		page: TradeInfo,
		isRouteToBeProtected: true,
	},
	{
		id: 10,
		path: Routes.USER_PROFILE,
		page: UserProfile,
		isRouteToBeProtected: true,
	},
	{
		id: 11,
		path: Routes.INFO,
		page: InfoPage,
		isRouteToBeProtected: true,
	},
];
