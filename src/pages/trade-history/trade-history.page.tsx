import { useEffect } from "react";
import Spinner from "../../components/spinner/spinner.component";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { fetchUserTrades } from "../../features/redux/slice/trade-journal.slice";
import { isSpinnerReq } from "../../helpers/helper-API-status";

import {
	TradeHistoryTitle,
	TradesWrapper,
	BannersContainer,
	AddJournalBanner,
	AddNewTradeButton,
	QuotesBanner,
	Container,
	OverviewWrapper,
	AddTradeContainer,
	AddTradeImage,
} from "./trade-history.styles";
import { useTheme } from "@mui/material";

import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import Button from "../../components/form-input-fields/button.component";
import { Routes } from "../../constants/route-paths";
import TradeOverviewCard from "../../components/trade-overview-card/trade-overview-card.component";
import { formatToIndianCurrency } from "../../helpers/currency-formatter";

const useStyles: any = makeStyles({
	button: {
		width: "100%",
		marginBlock: "10px",
		borderRadius: "20px",
		textTransform: "capitalize",
		fontWeight: "bold",
	},
});

const TradeHistory: () => JSX.Element = () => {
	const fetchStatus = useAppSelector(
		(state) => state.tradeJournal.fetchTrades.status
	);
	const isSpinnerRequired = isSpinnerReq(fetchStatus);
	const userUID = useAppSelector((state) => state.user.uid);
	const userTrades = useAppSelector(
		(state) => state.tradeJournal.fetchTrades.trades
	);
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		userUID && dispatch(fetchUserTrades(userUID));
	}, [userUID, dispatch]);

	const goToPostYourTrade = () => history.push(Routes.TRADE_JOURNAL);
	const goToTradeDetails = (id: string) => {
		history.push(`/trade-history/${id}`);
	};

	const Trades = (
		<Container>
			<BannersContainer>
				<AddJournalBanner>
					<AddNewTradeButton>
						<Button
							className={classes.button}
							color="primary"
							endIcon="launch"
							handleClick={goToPostYourTrade}
						>
							Post Your Trade
						</Button>
					</AddNewTradeButton>
				</AddJournalBanner>
				<QuotesBanner>
					<OverviewWrapper>
						<Button className={classes.button} color="primary">
							{`Total PNL: ${formatToIndianCurrency(
								userTrades.reduce(
									(prevPNL, currentTrade) =>
										prevPNL + Number(currentTrade.profitAndLoss),
									0
								)
							)}`}
						</Button>
					</OverviewWrapper>
					<OverviewWrapper>
						<Button className={classes.button} color="primary">
							{`Total Trades Puched: ${userTrades.length.toString()}`}
						</Button>
					</OverviewWrapper>
				</QuotesBanner>
			</BannersContainer>
			<TradeHistoryTitle>Trade History</TradeHistoryTitle>
			<TradesWrapper>
				{userTrades.length === 0 ? (
					<AddTradeContainer>
						<AddTradeImage></AddTradeImage>
						<div>post your trade to view</div>
					</AddTradeContainer>
				) : (
					userTrades.map((trade, index) => (
						<div key={index}>
							<TradeOverviewCard
								trade={trade}
								theme={theme}
								handleClick={() => goToTradeDetails(trade.id)}
							/>
						</div>
					))
				)}
			</TradesWrapper>
		</Container>
	);
	return isSpinnerRequired ? <Spinner isLoading={isSpinnerRequired} /> : Trades;
};

export default TradeHistory;
