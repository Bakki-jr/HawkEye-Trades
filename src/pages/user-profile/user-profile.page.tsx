import { TextField, useTheme } from "@mui/material";
import UserAvatar from "../../components/user-avatar/user-avatar.component";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import {
	Form,
	UserProfileContainer,
	UserProfileWrapper,
	FromFieldErrorMessageContainer,
	UploadImageWrapper,
	SubmitWrapper,
} from "./user-profile.styles";
import LoadingButton from "../../components/form-input-fields/button.component";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	fetchUser,
	resetUpdateUserProfileStatus,
	resetUploadImageStatus,
	updateUserProfile,
	uploadProfileImage,
} from "../../features/redux/slice/user.slice";
import { isAPIFetchedSuccefully } from "../../helpers/helper-API-status";
import { useEffect } from "react";
import useToast from "../../hooks/use-toast";
import { AppConstantMessages } from "../../constants/app-constans";

interface IUserProfole {
	name: string;
	email: string;
	profileURL?: any;
}

const schema = yup.object().shape({
	name: yup.string().required("*user name is required").min(3).max(50),
	email: yup.string().required(),
	profileURL: yup.mixed(),
});

const UserProfile = () => {
	const theme = useTheme();
	const userInfo = useAppSelector((state) => state.user);
	const uploadImageStatus = useAppSelector(
		(state) => state.user.uploadImageStatus
	);
	const updateProfileStatus = useAppSelector(
		(state) => state.user.updateUserProfileStatus
	);
	const fetchUserStatus = useAppSelector(
		(state) => state.user.fetchedUserStatus
	);
	const spinnerForImageUplaod = isAPIFetchedSuccefully(uploadImageStatus);
	const spinnerForProfileUpdate = isAPIFetchedSuccefully(updateProfileStatus);
	const spinnerForFetchUser = isAPIFetchedSuccefully(fetchUserStatus);
	const dispatch = useAppDispatch();
	const toast = useToast();
	const {
		control,
		register,
		formState: { errors },
		getValues,
		handleSubmit,
	} = useForm<IUserProfole>({ resolver: yupResolver(schema) });

	const updateUserInfo: SubmitHandler<IUserProfole> = async (data) => {
		const uploadImageParams = {
			file: data.profileURL.length > 0 ? data.profileURL[0] : "",
			uid: userInfo.uid,
		};
		const updateProfileParams = {
			uid: userInfo.uid,
			displayName: getValues("name"),
			photoURL: "",
		};
		if (uploadImageParams.file === "") {
			await dispatch(updateUserProfile(updateProfileParams));
		} else {
			await dispatch(uploadProfileImage(uploadImageParams));
		}
	};

	useEffect(() => {
		if (uploadImageStatus === "success") {
			dispatch(resetUploadImageStatus());
			const profileInfo = {
				uid: userInfo.uid,
				displayName: getValues("name"),
				photoURL: userInfo.imagePath
					? `https://firebasestorage.googleapis.com/v0/b/hawkeye-trades.appspot.com/o/${encodeURIComponent(
							userInfo.imagePath
					  )}?alt=media`
					: "",
			};
			dispatch(updateUserProfile(profileInfo));
		}
		return () => {
			dispatch(resetUpdateUserProfileStatus());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploadImageStatus]);

	useEffect(() => {
		updateProfileStatus === "success" &&
			userInfo.uid &&
			dispatch(fetchUser(userInfo.uid)).then((_) => {
				toast({ message: AppConstantMessages.UPDATED_USER_PROFILE });
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateProfileStatus]);

	return (
		<UserProfileContainer>
			<UserProfileWrapper theme={theme}>
				<UserAvatar
					user={{ name: userInfo.name, photoURL: userInfo.photoURL }}
					customSize={200}
				/>
				<Form onSubmit={handleSubmit(updateUserInfo)}>
					<Controller
						name="name"
						control={control}
						defaultValue={userInfo.name}
						render={({ field }) => (
							<TextField
								type="text"
								label="User Name"
								fullWidth
								color="primary"
								autoComplete="off"
								{...field}
							/>
						)}
					/>
					<FromFieldErrorMessageContainer>
						{errors.name?.message}
					</FromFieldErrorMessageContainer>
					<Controller
						name="email"
						control={control}
						defaultValue={userInfo.email}
						render={({ field }) => (
							<TextField
								type="email"
								label="Email Id"
								fullWidth
								color="primary"
								autoComplete="off"
								disabled={true}
								{...field}
							/>
						)}
					/>
					<UploadImageWrapper theme={theme}>
						<label>Profile Image:</label>
						<input type="file" {...register("profileURL")} />
					</UploadImageWrapper>
					<SubmitWrapper>
						<LoadingButton
							color="primary"
							type="submit"
							endIcon="send"
							loading={
								spinnerForImageUplaod ||
								spinnerForProfileUpdate ||
								spinnerForFetchUser
							}
						>
							Update Profile
						</LoadingButton>
					</SubmitWrapper>
				</Form>
			</UserProfileWrapper>
		</UserProfileContainer>
	);
};

export default UserProfile;
