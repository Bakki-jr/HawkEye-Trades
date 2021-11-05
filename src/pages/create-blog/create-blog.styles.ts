import styled from "styled-components";

export const Container = styled.div`
	padding-inline: 20px;
`;

export const AddBlogBackgroundWrapper = styled.div`
	max-width: 1000px;
	margin: 20px auto;
	padding: 25px;
	border-radius: 20px;
	background: ${(props) =>
		props.theme.mode === "dark" ? props.theme.secondary.dark : "#dedede"};
`;

export const Header = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-block-end: 15px;
	text-align: center;
`;

export const FromFieldErrorMessageContainer = styled.p`
	font-size: 0.8rem;
	color: red;
`;

export const FieldLabel = styled.div`
	margin-block-end: 10px;
`;
