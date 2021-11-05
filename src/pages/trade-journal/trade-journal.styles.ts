import { Button } from "@mui/material";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
export const TradeJournalPaddingWrapper = styled.div`
	padding-inline: 20px;
`;

export const TradeJournalBackgroundWrapper = styled.div`
	max-width: 1000px;
	margin: 20px auto;
	padding: 25px;
	border-radius: 20px;
	background: ${(props) =>
		props.theme.mode === "dark" ? props.theme.secondary.dark : "#dedede"};
`;

export const FormHeader = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-block-end: 15px;
	text-align: center;
`;

export const FromFieldErrorMessageContainer = styled.p`
	font-size: 0.8rem;
	color: red;
`;

export const AddItemWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	> div {
		margin-block-end: 20px;
	}
	> svg {
		margin-block-end: 20px;
		cursor: pointer;
	}
`;

export const CalculateButton = muiStyled(Button)`
	text-transform: capitalize;
	min-width: 150px;
	height: 40px;
	border-radius: 25px;
	display: block;
	margin-block-end: 25px;
	margin-inline: auto;
`;

export const AddAnotherPositionButton = muiStyled(Button)`
	text-transform: capitalize;
	height: 40px;
	border-radius: 25px;
	margin-block-end: 25px;
`;

export const TradeOutputWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	> div {
		margin-block-end: 20px;
	}
`;

export const SatisfactionItemWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const FieldArrayLabel = styled.div`
	margin-block-end: 20px;
`;

export const AddFieldArrayWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
`;

export const AdditionalTradeInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-block: 10px;
`;

export const AdditionalFieldsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	> div {
		margin-block-end: 10px;
	}
`;
