import { User, UserCredential } from "@firebase/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISignInForm } from "../../../pages/sign-in/sign-in.page";
import { googleSignInWithPopup, loginWithEmail } from "../../firebase/auth";

interface IEmaliLogin {
	[key: string]: any;
	isLoggedIn: boolean | null;
}

interface IGoogleLogin {
	status: string;
	isLoggedIn: boolean | null;
	uid?: string;
	user?: User;
	error?: any;
}

const initialState: IGoogleLogin | IEmaliLogin = {
	status: "",
	isLoggedIn: null,
};

export const signInWithGoogleAuth = createAsyncThunk<UserCredential, void, {}>(
	"login/signInWithGooglePopup",
	async () => {
		return await googleSignInWithPopup();
	}
);

export const signInWithEmail = createAsyncThunk<
	UserCredential,
	ISignInForm,
	{}
>("login/signInWithEmail", async (emailLoginInfo: ISignInForm) => {
	return await loginWithEmail(emailLoginInfo);
});

export const authSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetLoginData: () => initialState,
		setUserStatus: {
			reducer: (state, action: PayloadAction<any>) => {
				state.isLoggedIn = action.payload;
			},
			prepare: (state) => ({
				payload: state,
			}),
		},
	},
	extraReducers: {
		[signInWithGoogleAuth.pending.type]: (state) => {
			state.status = "pending";
			state.error = null;
		},
		[signInWithGoogleAuth.fulfilled.type]: (
			state,
			{ payload: { user } }: any
		) => {
			state.user = user;
			state.uid = user.uid;
			state.status = "success";
			state.error = null;
		},
		[signInWithGoogleAuth.rejected.type]: (state, { error }: any) => {
			state.status = "failed";
			state.error = error;
		},
		[signInWithEmail.pending.type]: (state) => {
			state.status = "pending";
			state.error = null;
		},
		[signInWithEmail.fulfilled.type]: (state, { payload: { user } }: any) => {
			state.user = user;
			state.uid = user.uid;
			state.status = "success";
			state.error = null;
		},
		[signInWithEmail.rejected.type]: (state, { error }: any) => {
			state.status = "failed";
			state.error = error;
		},
	},
});

export const { resetLoginData, setUserStatus } = authSlice.actions;

export default authSlice.reducer;
