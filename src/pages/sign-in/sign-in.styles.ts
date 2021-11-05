import styled from "styled-components";
import image1 from "../../assets/images/nli/user-nli-image-1.jpg";
import image2 from "../../assets/images/nli/user-nli-image-2.jpg";
import image3 from "../../assets/images/nli/user-nli-image-3.jpg";
import image4 from "../../assets/images/nli/user-nli-image-4.jpg";

import signInUserImage from "../../assets/images/nli/sign-in-user-image.svg";
import signUpUserImage from "../../assets/images/nli/sign-up-user-image.svg";

export const images = [image1, image2, image3, image4];

interface Props {
	image: string;
}

interface randomImageProp {
	randomImage: number;
}

export const Wrapper = styled.div<randomImageProp>`
	background-image: url(${(props) =>
		props.randomImage ? images[props.randomImage] : images[0]});
	width: 100vw;
	height: 100vh;
	background-size: cover;
`;

export const SignInContainer = styled.div`
	width: 900px;
	height: 550px;
	box-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);
	border-radius: 20px;
	position: relative;
	z-index: 1;
	overflow: hidden;
	margin-inline: auto;
	top: calc(50% - 550px / 2);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	&:before {
		content: "";
		position: absolute;
		background: inherit;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
		filter: blur(10px);
		margin: -20px;
	}
`;

export const SignInUserImage = styled.div<Props>`
	background-image: url(${(props) =>
		props.image === "userSignIn" ? signInUserImage : signUpUserImage});
	width: 406px;
	height: 306px;
	background-repeat: no-repeat;
`;

export const SignInFormWrapper = styled.div`
	background: ${(props) => props.theme.palette.background.default};
	width: 360px;
	border-radius: 20px;
	padding: 30px 20px;
`;

export const InternalPagesWrapper = styled.div`
	position: absolute;
	left: 75px;
  top: 65px;
}
`;
