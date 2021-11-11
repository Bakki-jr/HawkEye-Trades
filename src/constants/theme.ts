import { createTheme } from "@mui/material";
// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') || false;

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: "#9fffe0",
			main: "#69f0ae",
			dark: "#2bbd7e",
			contrastText: "#000000",
		},
		secondary: {
			light: "#4f5b62",
			main: "#263238",
			dark: "#000a12",
			contrastText: "#ffffff",
		},
		background: {
			default: "#00000090",
		},
	},
	typography: {
		fontFamily: ["Nunito"].join(","),
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		// primary: {
		// 	light: "#33CBB7",
		// 	main: "#00BFA5",
		// 	dark: "#008573",
		// 	contrastText: "#000000",
		// },
		secondary: {
			light: "#90909090",
			// main: "#757575",
			main: "#46516490",
			dark: "#51515190",
			contrastText: "#000000",
		},
		background: {
			default: "#ffffff90",
		},
	},
	typography: {
		fontFamily: ["Nunito"].join(","),
	},
});
