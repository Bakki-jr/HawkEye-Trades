import styled from "styled-components";

export const TradeInfoContainer = styled.div`
	padding: 20px;
`;

export const TradeInfoWrapper = styled.div`
	max-width: 1200px;
	margin: 20px auto;
	padding: 25px;
	border-radius: 20px;
	background: ${(props) =>
		props.theme.mode === "dark" ? props.theme.secondary.dark : "#dedede"};
`;
