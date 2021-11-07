import styled from "styled-components";

export const UserProfileContainer = styled.div`
	padding: 20px;
`;

export const UserProfileWrapper = styled.div`
	max-width: 600px;
	margin: 20px auto;
	padding: 25px;
  display:flex;
  justify-content: center;
	border-radius: 10px;
	background: ${(props) =>
		props.theme.palette.mode === "dark"
			? props.theme.palette.secondary.dark
			: "#dedede"};
`;



