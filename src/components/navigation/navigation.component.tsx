import { Fragment, useEffect, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { IUserThemePreference, Routes } from "../../constants/route-paths";
import { NavLink } from "react-router-dom";

import WebIcon from "@mui/icons-material/Web";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import InfoIcon from "@mui/icons-material/Info";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Box, useTheme } from "@mui/system";
import { useAppSelector } from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import useResetReduxState from "../../features/redux/reset-redux-state/reset-redux-state";
import { signOutFromApp } from "../../features/firebase/auth";
import DarkModeToggle from "react-dark-mode-toggle";
import useToast from "../../hooks/use-toast";
import UserAvatar from "../user-avatar/user-avatar.component";
import { AppConstantMessages } from "../../constants/app-constans";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(7)} + 1px)`,
	},
});

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Toggle = styled(DarkModeToggle)`
	margin-inline-end: 20px;
`;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const NavBar = ({ darkMode, setDarkMode }: IUserThemePreference) => {
	const [open, setOpen] = useState(false);
	const user = useAppSelector((state) => state.user);
	const reset = useResetReduxState();
	const theme = useTheme();
	const toast = useToast();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleLogout = async (e: any) => {
		reset().then(
			(res) =>
				res &&
				signOutFromApp().then(
					(res) =>
						res &&
						toast({ message: AppConstantMessages.LOGGED_OUT, variant: "info" })
				)
		);
	};

	const NavItems = [
		{
			title: "Blog Posts",
			icon: <AutoStoriesIcon color="primary" />,
			redirectTo: Routes.BLOG,
		},
		{
			title: "Post Your Blog",
			icon: <NoteAddIcon color="primary" />,
			redirectTo: Routes.ADD_BLOG,
		},
		{
			title: "Trade History",
			icon: <LabelImportantIcon color="primary" />,
			redirectTo: Routes.TRADE_HISTORY,
		},
		{
			title: "Trade Journal",
			icon: <StickyNote2Icon color="primary" />,
			redirectTo: Routes.TRADE_JOURNAL,
		},
		{
			title: "Stocks Info",
			icon: <WebIcon color="primary" />,
			redirectTo: Routes.STOCKS_INFO,
		},
	];

	const NavBottomItems = [
		{
			title: "Info",
			icon: <InfoIcon color="primary" />,
			redirectTo: Routes.INFO,
		},
		{
			title: "User Profile",
			icon: <AccountBoxIcon color="primary" />,
			redirectTo: Routes.USER_PROFILE,
		},
	];

	const handleToggleChange = () => {
		setDarkMode((prevState: boolean) => !prevState);
	};

	useEffect(() => {
		const userThemePreference = darkMode ? "dark" : "light";
		localStorage.setItem("theme", userThemePreference);
	}, [darkMode]);

	const AppHeader = (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: "36px",
						...(open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					HawkEye Trades
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Toggle
					onChange={handleToggleChange}
					checked={!darkMode}
					size={60}
					speed={2}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						marginInlineEnd: "15px",
					}}
				>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ textTransform: "capitalize" }}
					>
						{user.name}
					</Typography>
					<Typography variant="subtitle2">{user.email}</Typography>
				</Box>
				<UserAvatar user={{ name: user.name, photoURL: user.photoURL }} />
			</Toolbar>
		</AppBar>
	);

	const SideNav = (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					<CloseIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List disablePadding>
				{NavItems.map((item, index) => (
					<NavLink
						key={index}
						activeStyle={{
							background:
								theme.palette.mode === "dark" ? "#ffffff20" : "#00000020",
							display: "flex",
						}}
						exact
						to={item.redirectTo}
					>
						<ListItem button key={index}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItem>
					</NavLink>
				))}
			</List>
			<List
				sx={{ position: "absolute", bottom: "0", width: "100%" }}
				disablePadding
			>
				{NavBottomItems.map((item, index) => (
					<NavLink
						key={index}
						activeStyle={{
							background:
								theme.palette.mode === "dark" ? "#ffffff20" : "#00000020",
							display: "flex",
						}}
						exact
						to={item.redirectTo}
					>
						<ListItem button key={index}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItem>
					</NavLink>
				))}
				<div onClick={handleLogout}>
					<ListItem button>
						<ListItemIcon>
							<PowerSettingsNewIcon sx={{ color: "red" }} />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItem>
				</div>
			</List>
		</Drawer>
	);

	return (
		<Fragment>
			{AppHeader}
			{SideNav}
		</Fragment>
	);
};

export default NavBar;
