import { useEffect } from "react";
import { useRouteMatch } from "react-router";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { fetchTradeById } from "../../features/redux/slice/trade-journal.slice";
import { isSpinnerReq } from "../../helpers/helper-API-status";
import Spinner from "../../components/spinner/spinner.component";
import draftToHtml from "draftjs-to-html";
import { TradeInfoContainer, TradeInfoWrapper } from "./trade-info.styles";
import { useTheme } from "@mui/material";
import TradeDetails from "../../components/trade-details/trade-details.component";

interface IPageRouteParamID {
	params: { id: string };
}

export interface IFetchTradeDocRequest {
	uid: string;
	id: string;
}

const TradeInfo = () => {
	const {
		params: { id },
	}: IPageRouteParamID = useRouteMatch();

	const userUID = useAppSelector((state) => state.user.uid);
	const dispatch = useAppDispatch();
	const tradeInfo = useAppSelector(
		(state) => state.tradeJournal.fetchTradeById.trade
	);
	const getTradeInfoStatus = useAppSelector(
		(state) => state.tradeJournal.fetchTradeById.status
	);
	const isAPIFetched = isSpinnerReq(getTradeInfoStatus);
	const theme = useTheme();
	useEffect(() => {
		if (!userUID) return;
		const docToFetch: IFetchTradeDocRequest = { uid: userUID, id };
		dispatch(fetchTradeById(docToFetch));
	}, [id, userUID, dispatch]);

	const fetchTradeDetails = () => {
		if (!tradeInfo && getTradeInfoStatus === "success")
			return <div>404 Page</div>;
		else if (tradeInfo && getTradeInfoStatus === "success") {
			const rawContentState = tradeInfo?.advancedSelfReview;
			const hashtagConfig = {
				trigger: "#",
				separator: " ",
			};
			const markup = draftToHtml(rawContentState, hashtagConfig);
			return (
				<TradeInfoContainer>
					<TradeInfoWrapper theme={theme.palette}>
						<TradeDetails theme={theme} tradeInfo={tradeInfo} markup={markup} />
					</TradeInfoWrapper>
				</TradeInfoContainer>
			);
		} else {
			return <div></div>;
		}
	};

	return isAPIFetched ? (
		<Spinner isLoading={isAPIFetched} />
	) : (
		fetchTradeDetails()
	);
};

export default TradeInfo;
