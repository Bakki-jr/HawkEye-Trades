import styled from "styled-components";
import { Avatar } from "@mui/material";

interface ICustomSize {
	customsize: number | undefined;
}

export const CustomAvatar = styled(Avatar)<ICustomSize>`
	width: ${(props) =>
		props.customsize ? `${props.customsize}px !important` : "auto"};
	height: ${(props) =>
		props.customsize ? `${props.customsize}px !important` : "auto"};
	font-size: ${(props) => (props.customsize ? "8rem !important" : "")};
`;
