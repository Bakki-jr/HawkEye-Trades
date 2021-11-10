import styled from "styled-components";

export const UserProfileContainer = styled.div`
	padding: 10px;
`;

export const UserProfileWrapper = styled.div`
	max-width: 600px;
	margin: 10px auto;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 15px;
	border-radius: 10px;
	background: ${(props) =>
		props.theme.palette.mode === "dark"
			? props.theme.palette.secondary.main
			: "#dedede"};
`;

export const Form = styled.form`
	max-width: 450px;
	> div:not(:last-child) {
		margin-block-start: 1.5rem;
	}
`;

export const FromFieldErrorMessageContainer = styled.span`
	font-size: 1rem;
	color: red;
	margin-block-start: 0.8rem;
	display: inline-block;
`;

export const SubmitWrapper = styled.div`
	width: 180px;
	margin-inline: auto 0;
	margin-block-start: 0.8rem;
`;

export const UploadImageWrapper = styled.div`
	border: 1px solid
		${(props) =>
			props.theme.palette.mode === "dark"
				? "rgba(255, 255, 255, 0.3)"
				: "rgba(0, 0, 0, 0.2)"};
	border-radius: 3px;
	padding: 5px 10px;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
