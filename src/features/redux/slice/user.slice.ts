import { User } from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, saveUserToUsersCollection } from "../../firebase/auth";

interface IFetchedUser {
	name: string;
	email: string;
	uid: string | null;
	createdOn?: Date;
	fetchedUserStatus: string;
	fetchedUserError: any;
	[key: string]: any;
}

interface IAddUser {
	addUserToDbStatus: string;
	addUserToDbError: any;
}

type IUser = IFetchedUser & IAddUser;

const initialState: IUser = {
	addUserToDbStatus: "",
	addUserToDbError: null,
	name: "",
	email: "",
	uid: "",
	createdOn: undefined,
	fetchedUserStatus: "",
	fetchedUserError: null,
};

export const addUser = createAsyncThunk("user/addUser", async (user: User) => {
  console.log(user, 'userData before adding');
	return await saveUserToUsersCollection(user);
});

export const fetchUser = createAsyncThunk(
	"user/fetchUser",
	async (uid: string) => {
		return await fetchUserInfo(uid);
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
    resetUserData: () => initialState
  },
	extraReducers: {
		[addUser.pending.type]: (state: IAddUser) => {
			state.addUserToDbStatus = "pending";
			state.addUserToDbError = null;
		},
		[addUser.fulfilled.type]: (state: IAddUser) => {
			state.addUserToDbStatus = "success";
			state.addUserToDbError = null;
		},
		[addUser.rejected.type]: (state: IAddUser, { error }) => {
			state.addUserToDbStatus = "failed";
			state.addUserToDbError = error;
		},
		[fetchUser.pending.type]: (state: IFetchedUser) => {
			state.fetchedUserStatus = "pending";
			state.fetchedUserError = null;
		},
		[fetchUser.fulfilled.type]: (state: IFetchedUser, { payload : { name, email, uid, createdOn} }: any) => {
      state.name = name;
      state.email = email;
      state.uid = uid;
      state.createdOn = createdOn;
			state.fetchedUserStatus = "success";
			state.fetchedUserError = null;
		},
		[fetchUser.rejected.type]: (state: IFetchedUser, { error }) => {
			state.fetchedUserStatus = "failed";
			state.fetchedUserError = error;
		},
	},
});

export const { resetUserData } = userSlice.actions;

export default userSlice.reducer;
