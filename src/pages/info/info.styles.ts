import styled from "styled-components";

import react from "../../assets/images/app-info/react.png";
import reactRouter from "../../assets/images/app-info/react-router.png";
import typeScript from "../../assets/images/app-info/typescript.jpg";
import reduxToolkit from "../../assets/images/app-info/redux-toolkit.png";
import reactHookForm from "../../assets/images/app-info/react-hook-form.png";
import mui from "../../assets/images/app-info/mui.png";
import styledComponents from "../../assets/images/app-info/styled-components.jpeg";
import firebase from "../../assets/images/app-info/firebase.jpg";
import draftjs from "../../assets/images/app-info/draftjs.jpg";
import momentjs from "../../assets/images/app-info/momentjs.png";
import uuid from "../../assets/images/app-info/uuid.png";
import rive from "../../assets/images/app-info/rive.png";

export const librariesUsed = [
	{
		title: "React",
		image: react,
		info: "ReactJS is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components.",
	},
	{
		title: "React-Router",
		image: reactRouter,
		info: "React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.",
	},
	{
		title: "Typescript",
		image: typeScript,
		info: "TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs.",
	},
	{
		title: "Redux-Toolkit with Redux-Thunk & Redux-Logger",
		image: reduxToolkit,
		info: "Redux Toolkit is a toolset for efficient Redux development. It is intended to be the standard way to write Redux logic. It includes several utility functions that simplify the most common Redux use cases, including store setup, defining reducers, immutable update logic, and even creating entire 'slices' of state at once without writing any action creators or action types by hand. It also includes the most widely used Redux addons, like Redux Thunk for async logic and Reselect for writing selector functions. Currently In our app we've used Redux Thunk and Redux Logger.",
	},
	{
		title: "React-Hook-Form",
		image: reactHookForm,
		info: "React-hook-form is a library that helps you validate forms in React. React-hook-form is a minimal library without any other dependencies. It is performant and straightforward to use, requiring developers to write fewer lines of code than other form libraries. Used Yup for schema validation and Integrated with MUI UI library.",
	},
	{
		title: "MUI",
		image: mui,
		info: "Material-UI is simply a library that allows us to import and use different components to create a user interface in React applications.",
	},
	{
		title: "Styled-Components",
		image: styledComponents,
		info: "Styled-components is a library built for React and React Native developers. It allows you to use component-level styles in your applications. Styled-components leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS.",
	},
	{
		title: "Firebase",
		image: firebase,
		info: "Firebase is a Backend-as-a-Service (Baas). It provides developers with a variety of tools and services to help them develop quality apps. Firebase is categorized as a NoSQL database program, which stores data in JSON-like documents.",
	},
	{
		title: "DraftJS",
		image: draftjs,
		info: "Draft. js is a framework for building rich text editors in React, powered by an immutable model and abstracting over cross-browser differences.",
	},
	{
		title: "MomentJS",
		image: momentjs,
		info: "MomentJS is a JavaScript library which helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way.",
	},
	{
		title: "UUID",
		image: uuid,
		info: "A universally unique identifier (UUID) is an identifier of the 128-bit value that is used in the construction of software. Each bit present in the value differs by the meaning as several variants are considered. The main objective of this UUID is every time the numbers are generated, the value obtained will be universally unique.",
	},
	{
		title: "Rive",
		image: rive,
		info: "Rive is a real-time interactive design and animation tool. It has a collaborative editor to create motion graphics that respond to different states and user inputs. Then load your animations into apps, games, and websites with our lightweight open-source runtimes.",
	},
];

export const InfoPageContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 64px;
`;

export const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin: 20px;
	text-align: center;
	text-decoration: underline;
	color: ${(props) => props.theme.palette.primary.main};
`;

export const InfoWrapper = styled.div`
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
`;

export const LibraryItem = styled.div`
	width: 250px;
	margin: 10px;
	padding: 10px;
	text-align: center;
	cursor: pointer;
`;

export const LibraryImage = styled.div<any>`
	width: 180px;
	aspect-ratio: 1;
	border-radius: 50%;
	background: url(${(props) => props.item.image}), #000;
	background-position: center;
	background-repeat: no-repeat;
	background-size: ${(props) => getBackgroundSize(props.item.title)};
	margin: 0 auto;
	animation: bounceIn 0.8s;
	:hover {
		animation-name: rotate;
		animation-duration: 2s;
		animation-iteration-count: 2;
		animation-timing-function: linear;
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes bounceIn {
		0% {
			opacity: 1;
			transform: scale(0.2);
		}

		50% {
			opacity: 1;
			transform: scale(1.05);
		}

		70% {
			opacity: 1;
			transform: scale(0.9);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

export const LibraryTitle = styled.div`
	text-align: center;
	margin-block: 10px;
	font-weight: bold;
	font-size: 18px;
`;

const getBackgroundSize = (title: string) => {
	if (title === "UUID") return "180px";
	return "cover";
};
