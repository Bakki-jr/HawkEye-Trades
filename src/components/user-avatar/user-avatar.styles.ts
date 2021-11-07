import styled from "styled-components";
import { Avatar } from "@mui/material";

export const CustomAvatar = styled(Avatar)<any>`
	width: ${(props) =>
		props.customSize ? `${props.customSize}px !important` : "auto"};
	height: ${(props) =>
		props.customSize ? `${props.customSize}px !important` : "auto"};
	font-size: ${(props) => (props.customSize ? "3rem !important" : "")};
`;
