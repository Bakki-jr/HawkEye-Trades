import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import TextInput from "../../components/form-input-fields/text-input.component";
import Button from "../../components/form-input-fields/button.component";
import {
	images,
	SignInContainer,
	SignInFormWrapper,
	SignInUserImage,
	Wrapper,
} from "../sign-in/sign-in.styles";
import { useHistory } from "react-router";
import { Routes } from "../../constants/route-paths";
import { useTheme } from "@mui/material";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { signUpWithEmail } from "../../features/redux/slice/sign-up.slice";
import { addUser, fetchUser } from "../../features/redux/slice/user.slice";
import { User } from "@firebase/auth";
import { isSpinnerReq } from "../../helpers/helper-API-status";
import useToast from "../../hooks/use-toast";

export interface ISignUpForm {
	userName: string;
	email: string;
	password: string;
}

const SignUp = () => {
	const [signUpData, setSignUpData] = useState<ISignUpForm>({
		userName: "",
		email: "",
		password: "",
	});
	const history = useHistory();
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const toast = useToast();
	const userInfo: User | undefined = useAppSelector(
		(state) => state.signUp.user
	);
	const uid: string = useAppSelector((state) => state.signUp.uid);
	const isUserSignedUp = useAppSelector((state) => state.signUp.status);
	const isUserAdded = useAppSelector((state) => state.user.addUserToDbStatus);
	const isUserDataFetched = useAppSelector(
		(state) => state.user.fetchedUserStatus
	);
	const isSpinnerRequired = isSpinnerReq(isUserSignedUp);

	useEffect(() => {
		isUserSignedUp === "success" &&
			userInfo !== undefined &&
			dispatch(addUser({ ...userInfo, displayName: signUpData.userName }));
	}, [isUserSignedUp, dispatch, userInfo, signUpData]);

	useEffect(() => {
		isUserAdded === "success" && dispatch(fetchUser(uid));
	}, [uid, isUserAdded, dispatch]);

	useEffect(() => {
		isUserDataFetched === "success" && history.push(Routes.BLOG);
	}, [isUserDataFetched, history]);

	const handleChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setSignUpData({ ...signUpData, [name]: value });
	};

	const handleKeypress = (event: any) => {
		event.key === "Enter" && signUpNewUserWithEmail();
	};
	
	const signUpNewUserWithEmail = (event?: any) => {
		if (event) event.preventDefault();
		dispatch(signUpWithEmail(signUpData)).then((res: any) => {
			res?.error?.message &&
				toast({ message: res.error.message, variant: "error" });
		});
	};

	const redirectTo = () => history.push(Routes.SIGN_IN);

	const randomBackground = useMemo(
		() => Math.ceil(Math.random() * images.length - 1),
		[]
	);

	return (
		<Wrapper randomImage={randomBackground}>
			<SignInContainer>
				<SignInUserImage image="userSignUp" />
				<SignInFormWrapper theme={theme}>
					<Typography variant="h4" color="primary" align="center">
						Sign Up
					</Typography>
					<form>
						<TextInput
							label="UserName"
							name="userName"
							type="text"
							handleChange={handleChange}
							isAutoFocusRequired={true}
						></TextInput>
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
							autoCompleteInfo="current-password"
						></TextInput>
						<Button
							color="primary"
							endIcon="send"
							handleClick={signUpNewUserWithEmail}
							loading={isSpinnerRequired}
						>
							Unleash the journey
						</Button>
					</form>
					<Button endIcon="door" handleClick={redirectTo}>
						Back To Sign In
					</Button>
				</SignInFormWrapper>
			</SignInContainer>
		</Wrapper>
	);
};

export default SignUp;
