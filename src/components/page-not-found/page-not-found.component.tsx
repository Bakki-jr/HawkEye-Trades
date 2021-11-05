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
import { useAppSelector } from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";

const PageNotFound = () => {
	const theme = useTheme();
	const userUid = useAppSelector((state) => state.user.uid);
	return (
		<PageNotFoundWrapper theme={theme}>
			<ErrorImage image={LostImage}></ErrorImage>
			<ErrorTitle>This Page is Not on the Map</ErrorTitle>
			<ErrorContentWrapper>
				<ErrorCode>404</ErrorCode>
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
