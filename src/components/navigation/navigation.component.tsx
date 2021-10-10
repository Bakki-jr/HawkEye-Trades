import React, { Fragment, useState } from "react";
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

import { Routes } from "../../constants/route-paths";
import { NavLink } from "react-router-dom";

import WebIcon from "@mui/icons-material/Web";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { useTheme } from "@mui/system";

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

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const NavItems = [
		{
			title: "Dashboard",
			icon: <WebIcon color="secondary" />,
			redirectTo: Routes.DASHBOARD,
		},
		{
			title: "Blog",
			icon: <AutoStoriesIcon color="secondary" />,
			redirectTo: Routes.BLOG,
		},
		{
			title: "Trade History",
			icon: <LabelImportantIcon color="secondary" />,
			redirectTo: "",
		},
		{
			title: "Trade Journal",
			icon: <StickyNote2Icon color="secondary" />,
			redirectTo: "",
		},
	];

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
				<Typography variant="h6" noWrap component="div"></Typography>
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
					<NavLink key={index}
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
		</Drawer>
	);
	
	return (
		<Fragment>
			{AppHeader}
			{SideNav}
		</Fragment>
	);
}

export default NavBar;