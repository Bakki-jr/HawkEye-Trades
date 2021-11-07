import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageNotFoundWrapper = styled.div`
	background: ${(props) => props.theme.palette.primary.main};
	width: calc(100vw - 40px);
	height: calc(100vh - 60px);
	padding: 30px 20px;
`;

export const ErrorImage = styled.div<any>`
	background-image: url(${(props) => props.image});
	max-width: 350px;
	aspect-ratio: 1;
	background-repeat: no-repeat;
	background-size: contain;
	margin-inline: auto;
`;

export const ErrorTitle = styled.div<any>`
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin-block-start: 25px;
`;

export const ErrorContentWrapper = styled.div<any>`
	text-align: left;
	max-width: 400px;
	margin-inline: auto;
`;

export const ErrorCode = styled.div<any>`
	text-align: center;
	font-size: 5rem;
	font-weight: bold;
	margin-block-start: 5px;
`;

export const Info = styled.div`
	font-size: 1rem;
	font-weight: bold;
	color: ${(props) => props.color};
`;

export const RedirectLink = styled(Link)`
	color: #191970;
	font-size: 1.5rem;
	text-decoration: underline;
`;
