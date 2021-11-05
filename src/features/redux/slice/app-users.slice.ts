import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStatus } from "../../../interface/interface";
import { getUsersBasicInfo } from "../../firebase/users";

interface IUsers {
	users: any[];
	status: IStatus;
	dbError: any;
}

const initialState: IUsers = {
	users: [],
	status: "",
	dbError: null,
};

export const fetchUsers = createAsyncThunk(
	"usersInfo/fetchUsersInfo",
	async () => {
		return await getUsersBasicInfo();
	}
);

export const appUsersSlice = createSlice({
	name: "usersInfo",
	initialState,
	reducers: {
		resetUsersInfo: () => initialState,
	},
	extraReducers: {
		[fetchUsers.pending.type]: (state: IUsers) => {
			state.status = "pending";
			state.dbError = null;
		},
		[fetchUsers.fulfilled.type]: (state: IUsers, { payload }: any) => {
			state.status = "success";
			state.dbError = null;
			state.users = payload;
		},
		[fetchUsers.rejected.type]: (state: IUsers, { error }) => {
			state.status = "failed";
			state.dbError = error;
		},
	},
});

export const { resetUsersInfo } = appUsersSlice.actions;

export default appUsersSlice.reducer;
