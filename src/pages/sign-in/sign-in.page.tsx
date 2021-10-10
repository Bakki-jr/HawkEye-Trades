import { Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import Button from "../../components/form-input-fields/button.component";
import TextInput from "../../components/form-input-fields/text-input.component";
import { useHistory } from "react-router-dom";
import {
  SignInContainer,
  SignInFormWrapper,
  SignInUserImage,
  Wrapper,
} from "./sign-in.styles";
import { Routes } from "../../constants/route-paths";

interface ISignInForm {
  userName: string;
  password: string;
}

const SignIn = () => {
  const [signInData, setSignInData] = useState<ISignInForm>({
    userName: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    console.log(signInData);
    history.push(Routes.DASHBOARD);
  };

  const googleSignIn = () => {
    console.log("GSIN");
  };

  const redirectTo = () => history.push(Routes.SIGN_UP);

  return (
    <Wrapper >
      <SignInContainer>
        <SignInUserImage  image="userSignIn" />
        <SignInFormWrapper>
          <Typography variant="h4" color="secondary" align="center">
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
          ></TextInput>
          <Typography variant="body2" color="secondary" align="right">
            Forgot Password!
          </Typography>
          <Button color="secondary" endIcon="send" handleClick={handleClick}>
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
