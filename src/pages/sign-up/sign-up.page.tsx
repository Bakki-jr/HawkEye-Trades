import { ChangeEvent, useState } from "react";
import { Typography } from "@mui/material";
import TextInput from "../../components/form-input-fields/text-input.component";
import Button from "../../components/form-input-fields/button.component";
import {
	SignInContainer,
	SignInFormWrapper,
	SignInUserImage,
	Wrapper,
} from "../sign-in/sign-in.styles";
import { useHistory } from "react-router";
import { Routes } from "../../constants/route-paths";

interface ISignUpForm {
	userName: string;
	password: string;
}

const SignUp = () => {
	const [signUpData, setSignUpData] = useState<ISignUpForm>({
		userName: "",
		password: "",
	});
	const history = useHistory();

	const handleChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setSignUpData({ ...signUpData, [name]: value });
	};

	const handleClick = (event: any) => {
		event.preventDefault();
		console.log(signUpData);
	};

	const redirectTo = () => history.push(Routes.SIGN_IN);

	return (
		<Wrapper>
			<SignInContainer>
				<SignInUserImage image="userSignUp" />
				<SignInFormWrapper>
					<Typography variant="h4" color="secondary" align="center">
						Sign Up
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
					></TextInput>
					<Button color="secondary" endIcon="send" handleClick={handleClick}>
						Unleash the journey
					</Button>
					<Button endIcon="door" handleClick={redirectTo}>
            Back To Sign In
          </Button>
				</SignInFormWrapper>
			</SignInContainer>
		</Wrapper>
	);
};

export default SignUp;
