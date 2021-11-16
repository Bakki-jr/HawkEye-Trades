import styled from "styled-components";

export const TradeItem = styled.div`
	background: ${(props) => props.theme.palette.secondary.main};
	border-radius: 10px;
	margin: 10px;
	&:hover {
		background: ${(props) => props.theme.palette.secondary.dark};
		cursor: pointer;
	}
`;

export const TradeBannerLine = styled.div`
	background-color: ${(props) => props.color};
	height: 5px;
`;

export const ContentWrapper = styled.div`
	padding: 10px;
`;

export const Title = styled.div`
	text-align: center;
	font-size: 20px;
	font-weight: bold;
`;

export const ItemWrapper = styled.div``;

export const TradeItemkey = styled.span`
	text-decoration: underline;
`;

export const TradeItemValue = styled.span`
	font-weight: bold;
	margin-inline-start: 5px;
  letter-spacing: 1px;
`;

export const TradePNL = styled.span`
	color: ${(props) => props.color};
	font-weight: bold;
	margin-inline-start: 5px;
  letter-spacing: 1px;
`;

export const TradeCreatedOn = styled.div`
	text-align: end;
	color: ${(props) => props.theme.palette.primary.main};
`;
