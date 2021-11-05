import { Typography } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../components/form-input-fields/button.component";
import TextInput from "../../components/form-input-fields/text-input.component";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material";
import {
	images,
	SignInContainer,
	SignInFormWrapper,
	SignInUserImage,
	Wrapper,
} from "./sign-in.styles";
import { Routes } from "../../constants/route-paths";
import { isUserExists } from "../../features/firebase/auth";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { addUser, fetchUser } from "../../features/redux/slice/user.slice";
import {
	signInWithEmail,
	signInWithGoogleAuth,
} from "../../features/redux/slice/login.slice";
import { isAPIFetchedSuccefully } from "../../helpers/helper-API-status";
import useToast from "../../hooks/use-toast";

export interface ISignInForm {
	email: string;
	password: string;
}

const SignIn = () => {
	const [signInData, setSignInData] = useState<ISignInForm>({
		email: "",
		password: "",
	});

	const history = useHistory();
	const theme = useTheme();
	const toast = useToast();
	const dispatch = useAppDispatch();
	const { user, uid } = useAppSelector((state) => state.login);
	const isUserAdded = useAppSelector((state) => state.user.addUserToDbStatus);
	const userEmailLoginStatus = useAppSelector((state) => state.login.status);
	const isSpinnerRequired = isAPIFetchedSuccefully(userEmailLoginStatus);
	const isUserDataFetched = useAppSelector(
		(state) => state.user.fetchedUserStatus
	);

	const validateUser = useCallback(async () => {
		return await isUserExists(uid);
	}, [uid]);

	useEffect(() => {
		uid &&
			validateUser().then((isNewUser) => {
				console.log(!isNewUser, "isNewUser");
				!isNewUser && dispatch(addUser(user));
				isNewUser && uid && dispatch(fetchUser(uid));
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid]);

	useEffect(() => {
		isUserAdded === "success" && dispatch(fetchUser(uid));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUserAdded]);

	useEffect(() => {
		isUserDataFetched === "success" && history.push(Routes.BLOG);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUserDataFetched]);

	const handleChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setSignInData({ ...signInData, [name]: value });
	};

	const handleKeypress = (event: any) => {
		event.key === "Enter" && handleSignInWithEmail();
	};

	const handleSignInWithEmail = (event?: any) => {
		if (event) event.preventDefault();
		dispatch(signInWithEmail(signInData)).then((res: any) => {
			res?.error?.message &&
				toast({ message: res.error.message, variant: "error" });
		});
	};

	const googleSignIn = () => dispatch(signInWithGoogleAuth());

	const redirectTo = () => history.push(Routes.SIGN_UP);

	const randomBackground = useMemo(
		() => Math.ceil(Math.random() * images.length - 1),
		[]
	);

	return (
		<Wrapper randomImage={randomBackground}>
			<SignInContainer>
				<SignInUserImage image="userSignIn" />
				<SignInFormWrapper theme={theme}>
					<Typography variant="h4" color="primary" align="center">
						Login
					</Typography>
					<TextInput
						label="Email"
						name="email"
						type="email"
						handleChange={handleChange}
					></TextInput>
					<TextInput
						label="Password"
						name="password"
						type="password"
						handleChange={handleChange}
						handleKeyPress={handleKeypress}
					></TextInput>
					<Typography variant="body2" color="primary" align="right">
						Forgot Password!
					</Typography>
					<Button
						type="submit"
						color="primary"
						endIcon="send"
						handleClick={handleSignInWithEmail}
						loading={isSpinnerRequired}
					>
						Unleash the journey
					</Button>
					<Button startIcon="google" color="info" handleClick={googleSignIn}>
						Google Sign In
					</Button>
					<Button endIcon="door" handleClick={redirectTo}>
						Sign Up to Start your journey
					</Button>
				</SignInFormWrapper>
			</SignInContainer>
		</Wrapper>
	);
};

export default SignIn;
