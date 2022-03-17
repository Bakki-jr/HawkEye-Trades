import { useTheme } from "@mui/material";
import {
	PageNotFoundWrapper,
	ErrorImage,
	ErrorTitle,
	ErrorContentWrapper,
	ErrorCode,
	Info,
	RedirectLink,
} from "./page-not-found.styles";
import LostImage from "../../assets/images/page-not-found/lost-page.png";
import ErrorSVG from "../../assets/images//page-not-found/404.svg";
import { useAppSelector } from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";

const PageNotFound = () => {
	const theme = useTheme();
	const userUid = useAppSelector((state) => state.user.uid);
	const images = [LostImage, ErrorSVG];
	const randomImage = images[Math.floor(Math.random() * images.length)];
	return (
		<PageNotFoundWrapper theme={theme}>
			<ErrorImage data-testid="error-image" image={randomImage}></ErrorImage>
			<ErrorTitle>This Page is Not on the Map</ErrorTitle>
			<ErrorContentWrapper>
				<ErrorCode data-testid="error-code">404</ErrorCode>
				<Info>Aha! You see! You can be wrong!</Info>
				<Info color={"grey"}>(or it could be us)</Info>
				<Info>...either way please click on below link to redirect</Info>
				<Info>
					go back to
					{userUid ? (
						<RedirectLink to="/">home page</RedirectLink>
					) : (
						<RedirectLink to="/sign-in">sign-in page</RedirectLink>
					)}
				</Info>
			</ErrorContentWrapper>
		</PageNotFoundWrapper>
	);
};

export default PageNotFound;
