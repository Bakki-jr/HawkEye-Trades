import { Typography } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/form-input-fields/button.component";
import TextInput from "../../components/form-input-fields/text-input.component";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material";
import {
	SignInContainer,
	SignInFormWrapper,
	SignInWrapper,
	TeddyWrapper,
} from "./sign-in.styles";
import { Routes } from "../../constants/route-paths";
import { isUserExists } from "../../features/firebase/auth";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { addUser, fetchUser } from "../../features/redux/slice/user.slice";
import {
	setUserStatus,
	signInWithEmail,
	signInWithGoogleAuth,
} from "../../features/redux/slice/login.slice";
import { isAPIFetchedSuccefully } from "../../helpers/helper-API-status";
import useToast from "../../hooks/use-toast";
import { useRive } from "rive-react";
import TeddyRiveComponent from "../../components/teddy-login-rive/teddy-login-rive.component";
import {
	STATE_TEDDY_MACHINE_NAME,
	useTeddyRiveFailure,
	useTeddyRiveSuccess,
} from "../../hooks/use-login-teddy-rive";
import {
	STATE_TREE_MACHINE_NAME,
	useTreeRiveInputChange,
} from "../../hooks/use-tree-rive";
import TreeRiveComponent from "../../components/tree-rive/tree-rive.component";

export interface ISignInForm {
	email: string;
	password: string;
}

const SignIn = () => {
	const [signInData, setSignInData] = useState<ISignInForm>({
		email: "",
		password: "",
	});
	const inputTypeRef = useRef("");

	const treeRiveParams = {
		src: "rive/tree.riv",
		stateMachines: STATE_TREE_MACHINE_NAME,
		artboard: "New Artboard",
		autoplay: true,
	};
	const { RiveComponent: TreeRive, rive: TreeRiveInstance } =
		useRive(treeRiveParams);

	const teddyRiveParams = {
		src: "rive/teddy.riv",
		stateMachines: STATE_TEDDY_MACHINE_NAME,
		artboard: "Artboard",
		animations: ["look_idle"],
		autoplay: true,
	};
	const { RiveComponent: teddyRive, rive: teddyRiveInstance } =
		useRive(teddyRiveParams);

	const history = useHistory();
	const theme = useTheme();
	const toast = useToast();
	const dispatch = useAppDispatch();
	const { user, uid } = useAppSelector((state) => state.login);
	const isUserAdded = useAppSelector((state) => state.user.addUserToDbStatus);
	const userSignInStatus = useAppSelector((state) => state.login.status);
	const isUserDataFetched = useAppSelector(
		(state) => state.user.fetchedUserStatus
	);
	const loggedInUserName = useAppSelector((state) => state.user.name);
	const spinnerForSignIn = isAPIFetchedSuccefully(userSignInStatus);
	const sipnnerForUserFetch = isAPIFetchedSuccefully(isUserDataFetched);

	const teddyRiveSuccess = useTeddyRiveSuccess(teddyRiveInstance);
	const teddyRiveFailure = useTeddyRiveFailure(teddyRiveInstance);
	const treeRiveInputChange: any = useTreeRiveInputChange(TreeRiveInstance);

	useEffect(() => {
		const emailLength = signInData.email.length;
		const passwordLength = signInData.password.length;
		if (emailLength > 0 && passwordLength === 0) {
			treeRiveInputChange.value = 10;
		} else if (passwordLength > 0 && passwordLength < 8 && emailLength !== 0) {
			treeRiveInputChange.value = 20;
		} else if (
			(passwordLength >= 8 && emailLength < 5 && emailLength > 2) ||
			(passwordLength < 8 && emailLength >= 10 && passwordLength > 5)
		) {
			treeRiveInputChange.value = 40;
		} else if (passwordLength >= 8 && emailLength > 10) {
			treeRiveInputChange.value = 100;
		} else if (emailLength === 0 && passwordLength === 0) {
			if (TreeRiveInstance) treeRiveInputChange.value = 0;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signInData]);

	const validateUser = useCallback(async () => {
		return await isUserExists(uid);
	}, [uid]);

	useEffect(() => {
		userSignInStatus === "success" &&
			validateUser().then((isUserExists) => {
				!isUserExists && dispatch(addUser(user));
				isUserExists &&
					uid &&
					isUserAdded === "success" &&
					dispatch(fetchUser(uid));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSignInStatus, isUserAdded]);

	useEffect(() => {
		if (isUserDataFetched === "success") {
			dispatch(setUserStatus(true));
			history.push(Routes.BLOG);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUserDataFetched]);

	useEffect(() => {
		isUserDataFetched === "success" &&
			userSignInStatus === "success" &&
			toast({
				message: `Welcome back ${loggedInUserName}`,
			});

		if (userSignInStatus === "success") {
			inputTypeRef.current === "password" &&
				teddyRiveInstance &&
				teddyRiveInstance.play(["hands_down"]);
			teddyRiveInstance && teddyRiveSuccess && teddyRiveSuccess.fire();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSignInStatus, isUserDataFetched]);

	const handleChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setSignInData({ ...signInData, [name]: value });
		if (name === "email" && inputTypeRef.current !== "email") {
			inputTypeRef.current !== "" &&
				teddyRiveInstance &&
				teddyRiveInstance.play(["hands_down"]);
			inputTypeRef.current = name;
		}
		if (name === "password" && inputTypeRef.current !== "password") {
			inputTypeRef.current = name;
			teddyRiveInstance && teddyRiveInstance.play(["hands_up"]);
		}
	};

	const handleKeypress = (event: any) => {
		event.key === "Enter" && handleSignInWithEmail();
	};

	const handleSignInWithEmail = (event?: any) => {
		if (event) event.preventDefault();
		dispatch(signInWithEmail(signInData)).then((res: any) => {
			if (res?.error?.message) {
				inputTypeRef.current === "password" &&
					teddyRiveInstance &&
					teddyRiveInstance.play(["hands_down"]);
				teddyRiveInstance && teddyRiveFailure && teddyRiveFailure.fire();
				toast({ message: res.error.message, variant: "error" });
			}
		});
	};

	const googleSignIn = () => dispatch(signInWithGoogleAuth());

	const redirectTo = () => history.push(Routes.SIGN_UP);

	return (
		<SignInWrapper>
			<TreeRiveComponent riveComponent={TreeRive} />
			<SignInContainer>
				<TeddyWrapper>
					<TeddyRiveComponent riveComponent={teddyRive} />
				</TeddyWrapper>
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
						loading={spinnerForSignIn || sipnnerForUserFetch}
					>
						Unleash the journey
					</Button>
					<Button startIcon="google" color="warning" handleClick={googleSignIn}>
						Google Sign In
					</Button>
					<Button endIcon="door" handleClick={redirectTo}>
						Sign Up to Start your journey
					</Button>
				</SignInFormWrapper>
			</SignInContainer>
		</SignInWrapper>
	);
};

export default SignIn;
