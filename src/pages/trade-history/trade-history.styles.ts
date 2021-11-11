import styled from "styled-components";
import QuotesbannerWave from "../../assets/images/waves/add-trade-banner.svg";
import addJournalBannerWave from "../../assets/images/waves/banner-wave.svg";
import AddTradeSVG from "../../assets/images/trade-history/add-trade.svg";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
`;

export const BannersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	> div {
		margin-block-end: 15px;
		margin-inline: 5px;
	}
`;

export const OverallTradeInfoWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const AddNewTradeButton = styled.div`
	width: 160px;
	border-radius: 10px;
	margin-inline-end: 10px;
	display: flex;
	align-self: end;
`;

export const TradeQoute = styled.div`
	font-weight: bold;
	color: #000;
	width: 94%;
	margin-inline: auto;
	margin-block-start: 5px;
	padding-block-start: 5px;
	max-height: 50px;
	overflow-y: auto;
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

export const TradeQuoteedBy = styled.div`
	min-width: 160px;
	max-width: max-content;
	border-radius: 10px;
	margin-inline-end: 10px;
	display: flex;
	justify-self: flex-end;
	max-height: 55px;
`;

export const OverviewWrapper = styled.div`
	border-radius: 10px;
	margin-inline-end: 10px;
	max-height: 50px;
	margin-block-end: 4px;
`;

export const AddJournalBanner = styled.div`
	min-height: 110px;
	border-radius: 15px;
	background: url(${addJournalBannerWave});
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: max(40%, 600px);
`;

export const QuotesBanner = styled.div`
	min-height: 110px;
	border-radius: 15px;
	background: url(${QuotesbannerWave});
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: cover;
	display: grid;
	place-self: end;
	width: max(40%, 600px);
`;

export const TradeHistoryTitle = styled.div`
	font-size: 28px;
	font-weight: bold;
	border-bottom: 3px solid;
	margin-block: 10px;
`;

export const TradesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	margin: 20px;
`;

export const AddTradeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 18px;
`;

export const AddTradeImage = styled.div`
	background-image: url(${AddTradeSVG});
	width: 500px;
	height: 380px;
	text-align: center;
	position: relative;
	vertical-align: text-top;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;
