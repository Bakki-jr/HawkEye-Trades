import { User } from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, saveUserToUsersCollection } from "../../firebase/auth";
import {
	updateProfileInfo,
	uploadProfileImageToStorage,
} from "../../firebase/users";

interface IFetchedUser {
	name: string;
	email: string;
	uid: string | null;
	createdOn?: Date;
	photoURL?: string;
	fetchedUserStatus: string;
	fetchedUserError: any;
	[key: string]: any;
}

interface IAddUser {
	addUserToDbStatus: string;
	addUserToDbError: any;
}

interface IUploadImage {
	imagePath: string;
	uploadImageStatus: string;
	uploadImageError: null | string;
}

interface IUpdateProfile {
	updateUserProfileStatus: string;
	updateUserProfileError: null | string;
}

type IUser = IFetchedUser & IAddUser & IUploadImage & IUpdateProfile;

const initialState: IUser = {
	addUserToDbStatus: "",
	addUserToDbError: null,
	name: "",
	email: "",
	uid: "",
	createdOn: undefined,
	fetchedUserStatus: "",
	fetchedUserError: null,
	uploadImageStatus: "",
	imagePath: "",
	uploadImageError: null,
	updateUserProfileStatus: "",
	updateUserProfileError: null,
};

export const addUser = createAsyncThunk("user/addUser", async (user: User) => {
	return await saveUserToUsersCollection(user);
});

export const fetchUser = createAsyncThunk(
	"user/fetchUser",
	async (uid: string) => {
		return await fetchUserInfo(uid);
	}
);

export const uploadProfileImage = createAsyncThunk(
	"user/uploadProfileImage",
	async ({ file, uid }: { file: any; uid: string | null }) => {
		return await uploadProfileImageToStorage(file, uid);
	}
);

export const updateUserProfile = createAsyncThunk(
	"user/updateUserProfile",
	async (profileInfo: any) => {
		return await updateProfileInfo(profileInfo);
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetUserData: () => initialState,
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
		[fetchUser.fulfilled.type]: (
			state: IFetchedUser,
			{ payload: { name, email, uid, createdOn, photoURL } }: any
		) => {
			state.name = name;
			state.email = email;
			state.uid = uid;
			state.createdOn = createdOn;
			state.photoURL = photoURL;
			state.fetchedUserStatus = "success";
			state.fetchedUserError = null;
		},
		[fetchUser.rejected.type]: (state: IFetchedUser, { error }) => {
			state.fetchedUserStatus = "failed";
			state.fetchedUserError = error;
		},
		[uploadProfileImage.pending.type]: (state: IUploadImage) => {
			state.uploadImageStatus = "pending";
		},
		[uploadProfileImage.fulfilled.type]: (
			state: IUploadImage,
			{ payload }: any
		) => {
			state.uploadImageStatus = "success";
			state.imagePath = payload;
		},
		[uploadProfileImage.rejected.type]: (state: IUploadImage, { error }) => {
			state.uploadImageStatus = "failed";
			state.uploadImageError = error;
		},
		[updateUserProfile.pending.type]: (state: IUpdateProfile) => {
			state.updateUserProfileStatus = "pending";
		},
		[updateUserProfile.fulfilled.type]: (state: IUpdateProfile) => {
			state.updateUserProfileStatus = "success";
		},
		[updateUserProfile.rejected.type]: (state: IUpdateProfile, { error }) => {
			state.updateUserProfileStatus = "failed";
			state.updateUserProfileError = error;
		},
	},
});

export const {
	resetUserData,
} = userSlice.actions;

export default userSlice.reducer;
