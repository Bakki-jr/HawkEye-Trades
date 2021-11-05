import styled from "styled-components";

export const ModalBackground = styled.div<any>`
	width: -webkit-fill-available;
	height: ${(props) => `${props.height}px`};
	position: absolute;
	top: 0;
	left: 0;
	background-color: #00000050;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2000;
`;

export const ModalContainer = styled.div`
	width: 80%;
	max-width: 600px;
	height: 500px;
	border-radius: 12px;
	background-color: ${(props) =>
		props.theme.palette.mode === "dark"
			? props.theme.palette.secondary.dark
			: "#fff"};
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 25px;
	margin-inline: auto;
	top: calc(50vh - 250px);
`;

export const Title = styled.div`
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
`;

export const Content = styled.div`
	font-size: 1rem;
	text-align: justify;
	margin: 15px;
	overflow-y: auto;
	padding-inline-end: 10px;
	flex-grow: 1;
	margin-block-start: 25px;

	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px ${(props) => props.theme.palette.primary.main};
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme.palette.primary.main};
		border-radius: 10px;
	}
`;

export const Footer = styled.div`
	display: flex;
	width: 120px;
	align-self: flex-end;
`;
