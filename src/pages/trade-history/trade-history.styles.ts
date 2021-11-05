import styled from "styled-components";
import QuotesbannerWave from "../../assets/images/waves/add-trade-banner.svg";
import addJournalBannerWave from "../../assets/images/waves/banner-wave.svg";

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

export const AddNewTradeButton = styled.div`
	width: 160px;
	border-radius: 10px;
	align-self: end;
	margin-inline-end: 10px;
`;

export const OverviewWrapper = styled.div`
	border-radius: 10px;
	margin-inline-end: 10px;
`;

export const AddJournalBanner = styled.div`
	min-height: 100px;
	border-radius: 15px;
	justify-content: flex-end;
	background: url(${addJournalBannerWave});
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: cover;
	display: grid;
	place-self: end;
	width: max(40%, 600px);
`;

export const QuotesBanner = styled.div`
	min-height: 100px;
	border-radius: 15px;
	background: url(${QuotesbannerWave});
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: cover;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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