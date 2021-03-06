import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStatus } from "../../../interface/interface";
import { IFetchTradeDocRequest } from "../../../pages/trade-info/trade-info.page";
import { ITradeJournal } from "../../../pages/trade-journal/trade-journal.page";
import {
	getTrades,
	getTradeDocById,
	saveTradeToTradesCollection,
	getTradingQuotes,
} from "../../firebase/trade-journal";

export interface IQuotes {
	quote: string;
	trader: string;
}

interface IUserTradeJournal {
	saveTrade: {
		status: IStatus;
		addTradeToDbError: null | any;
	};
	fetchTrades: {
		status: IStatus;
		trades: ITradeDetails[];
	};
	fetchTradeById: {
		status: IStatus;
		trade?: ITradeDetails;
	};
	fetchTradingQuotes: {
		status: IStatus;
		quotes: IQuotes[];
	};
}

export interface ITradeDetails extends ITradeJournal {
	createdOn: any;
	uid: string;
	id: string;
}

const initialState: IUserTradeJournal = {
	saveTrade: {
		status: "",
		addTradeToDbError: null,
	},
	fetchTrades: {
		status: "",
		trades: [],
	},
	fetchTradeById: {
		status: "",
	},
	fetchTradingQuotes: {
		status: "",
		quotes: [],
	},
};

export const saveTradeJournal = createAsyncThunk(
	"tradeJournal/saveTrade",
	async (tradeDetails: any) => {
		return await saveTradeToTradesCollection(tradeDetails);
	}
);

export const fetchUserTrades = createAsyncThunk(
	"tradeJournal/fetchTrades",
	async (uid: string) => {
		return await getTrades(uid);
	}
);

export const fetchTradeById = createAsyncThunk(
	"tradeJournal/fetchTradeById",
	async (docToFetch: IFetchTradeDocRequest) => {
		return await getTradeDocById(docToFetch);
	}
);

export const fetchTradingQuotes = createAsyncThunk(
	"tradeJournal/fetchTradingQuotes",
	async () => {
		return await getTradingQuotes();
	}
);

export const tradeJournalSlice = createSlice({
	name: "tradeJournal",
	initialState,
	reducers: {
		resetUserTrades: () => initialState,
		resetSaveTradeStatus: (state) => {
			state.saveTrade.status = "";
		},
		resetFetchUserTradesStatus: (state) => {
			state.fetchTrades.status = "";
		},
	},
	extraReducers: {
		[saveTradeJournal.pending.type]: (state: IUserTradeJournal) => {
			state.saveTrade.status = "pending";
			state.saveTrade.addTradeToDbError = null;
		},
		[saveTradeJournal.fulfilled.type]: (state: IUserTradeJournal) => {
			state.saveTrade.status = "success";
			state.saveTrade.addTradeToDbError = null;
		},
		[saveTradeJournal.rejected.type]: (state: IUserTradeJournal, { error }) => {
			state.saveTrade.status = "failed";
			state.saveTrade.addTradeToDbError = error;
		},
		[fetchUserTrades.pending.type]: (state: IUserTradeJournal) => {
			state.fetchTrades.status = "pending";
		},
		[fetchUserTrades.fulfilled.type]: (
			state: IUserTradeJournal,
			{ payload }: any
		) => {
			state.fetchTrades.status = "success";
			state.fetchTrades.trades = payload;
		},
		[fetchUserTrades.rejected.type]: (state: IUserTradeJournal, { error }) => {
			state.fetchTrades.status = "failed";
		},
		[fetchTradeById.pending.type]: (state: IUserTradeJournal) => {
			state.fetchTradeById.status = "pending";
		},
		[fetchTradeById.fulfilled.type]: (
			state: IUserTradeJournal,
			{ payload }: any
		) => {
			state.fetchTradeById.status = "success";
			state.fetchTradeById.trade = payload;
		},
		[fetchTradeById.rejected.type]: (state: IUserTradeJournal, { error }) => {
			state.fetchTradeById.status = "failed";
		},
		[fetchTradingQuotes.pending.type]: (state: IUserTradeJournal) => {
			state.fetchTradingQuotes.status = "pending";
		},
		[fetchTradingQuotes.fulfilled.type]: (
			state: IUserTradeJournal,
			{ payload: { quotes } }: { payload: { quotes: Array<IQuotes> } }
		) => {
			state.fetchTradingQuotes.status = "success";
			state.fetchTradingQuotes.quotes = quotes;
		},
		[fetchTradingQuotes.rejected.type]: (
			state: IUserTradeJournal,
			{ error }
		) => {
			state.fetchTradingQuotes.status = "failed";
		},
	},
});

export const {
	resetUserTrades,
	resetSaveTradeStatus,
	resetFetchUserTradesStatus,
} = tradeJournalSlice.actions;

export default tradeJournalSlice.reducer;
