import { createTheme } from "@mui/material";
// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') || false;

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#4f5b62",
      main: "#263238",
      dark: "#000a12",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#9fffe0",
      main: "#69f0ae",
      dark: "#2bbd7e",
      contrastText: "#000000",
    },
    background: {
			default:"#00000090",
		}
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
		background: {
			default:"#ffffff90",
		}	
	},
});
