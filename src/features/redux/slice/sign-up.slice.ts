import { User, UserCredential } from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISignUpForm } from "../../../pages/sign-up/sign-up.page";
import { signUpWithEmailAndPassword } from "../../firebase/auth";

interface ISignUpStatus {
	status: string;
	uid: string;
	user?: User;
	error?: any;
}

const initialState: ISignUpStatus = {
	status: "",
	uid: "",
  error: null
};

export const signUpWithEmail = createAsyncThunk<
	UserCredential,
	ISignUpForm,
	{}
>("signUp/signUpWithEmail", async (signUpData: ISignUpForm) => {
	return await signUpWithEmailAndPassword(signUpData);
});

export const signUpSlice = createSlice({
	name: "signUp",
	initialState,
	reducers: {},
	extraReducers: {
		[signUpWithEmail.pending.type]: (state) => {
			state.status = "pending";
			state.error = null;
		},
		[signUpWithEmail.fulfilled.type]: (state, { payload }) => {
			const user: User = payload.user;
			state.user = user;
			state.uid = user.uid;
			state.status = "success";
			state.error = null;
		},
		[signUpWithEmail.rejected.type]: (state, { error }: any) => {
			state.status = "failed";
			state.error = error;
		},
	},
});

export default signUpSlice.reducer;
