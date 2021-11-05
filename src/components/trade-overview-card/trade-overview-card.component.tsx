import {
	ContentWrapper,
	Title,
	TradeBannerLine,
	TradeItem,
	ItemWrapper,
	TradeItemkey,
	TradeItemValue,
	TradePNL,
	TradeCreatedOn,
} from "./trade-overview-card.styles";
import { getDateFromTimeStamp } from "../../helpers/helper-date";
import { Theme } from "@mui/system";
import { ITradeDetails } from "../../features/redux/slice/trade-journal.slice";
import { formatToIndianCurrency } from "../../helpers/currency-formatter";

interface ITradeOverview {
  trade: ITradeDetails;
  theme: Theme;
  handleClick: any;
}

const TradeOverviewCard = (props: ITradeOverview) => {
	const { trade, theme, handleClick } = props;
	return (
		<TradeItem theme={theme} onClick={handleClick}>
			<TradeBannerLine
				color={trade.profitAndLoss > 0 ? "#90EE90" : "#FF5733"}
			></TradeBannerLine>
			<ContentWrapper>
				<Title>{trade.stockName}</Title>
				<ItemWrapper>
					<TradeItemkey>Segment:</TradeItemkey>
					<TradeItemValue>{trade.segment}</TradeItemValue>
				</ItemWrapper>
				<ItemWrapper>
					<TradeItemkey>Amount Invested:</TradeItemkey>
					<TradeItemValue>
						{formatToIndianCurrency(trade.investedAmount)}
					</TradeItemValue>
				</ItemWrapper>
				<ItemWrapper>
					<TradeItemkey>P&L:</TradeItemkey>
					<TradePNL color={trade.profitAndLoss > 0 ? "#90EE90" : "#FF5733"}>
						{formatToIndianCurrency(trade.profitAndLoss)}
					</TradePNL>
				</ItemWrapper>
				<ItemWrapper>
					<TradeItemkey>ROI:</TradeItemkey>
					<TradeItemValue>{trade.roi} %</TradeItemValue>
				</ItemWrapper>
				<ItemWrapper>
					<TradeItemkey>Duration:</TradeItemkey>
					<TradeItemValue>{trade.durationOfTrade}</TradeItemValue>
				</ItemWrapper>
				<TradeCreatedOn theme={theme}>
					{getDateFromTimeStamp(trade.createdOn)}
				</TradeCreatedOn>
			</ContentWrapper>
		</TradeItem>
	);
};

export default TradeOverviewCard;
