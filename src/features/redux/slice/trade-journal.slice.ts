import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStatus } from "../../../interface/interface";
import { IFetchTradeDocRequest } from "../../../pages/trade-info/trade-info.page";
import { ITradeJournal } from "../../../pages/trade-journal/trade-journal.page";
import {
	getTrades,
	getTradeDocById,
	saveTradeToTradesCollection,
} from "../../firebase/trade-journal";

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

export const tradeJournalSlice = createSlice({
	name: "tradeJournal",
	initialState,
	reducers: {
		resetUserTrades: () => initialState,
		resetSaveTradeStatus: (state) => {
			state.saveTrade.status = "";
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
	},
});

export const { resetUserTrades, resetSaveTradeStatus } =
	tradeJournalSlice.actions;

export default tradeJournalSlice.reducer;
