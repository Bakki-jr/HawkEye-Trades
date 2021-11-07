import styled from "styled-components";
import image1 from "../../assets/images/nli/light.jpg";
import image2 from "../../assets/images/nli/silloute-fishing-boat.jpg";
import image3 from "../../assets/images/nli/street-light.jpg";
import image4 from "../../assets/images/nli/window.jpg";
import image5 from "../../assets/images/nli/mountain.jpg";

import Rocket from "../../assets/images/nli/rocket.svg";
import Launch from "../../assets/images/nli/launch.svg";

export const images = [image1, image2, image3, image4, image5];

interface Props {
	image: string;
}

interface randomImageProp {
	randomImage: number;
}

export const Wrapper = styled.div<randomImageProp>`
	background: url(${(props) =>
			props.randomImage ? images[props.randomImage] : images[0]}),
		#00000080;
	width: 100vw;
	height: 100vh;
	background-size: cover;
`;

export const SignInWrapper = styled.div`
	background: #4d4c60;
	width: 100vw;
	height: 100vh;
	background-size: cover;
`;
export const RiveWrapper = styled.div`
	position: fixed;
	bottom: 0;
	right: 0;
	width: 310px;
	height: 310px;
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

export const TeddyWrapper = styled.div`
	width: 400px;
	height: 483px;
	border-radius: 20px;
	overflow: hidden;
	background: #d6e2ea;
	position: relative;
`;

export const SignInUserImage = styled.div<Props>`
	background-image: url(${(props) =>
		props.image === "userSignIn" ? Rocket : Launch});
	width: 350px;
	aspect-ratio: 1;
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
