import { TextField } from "@mui/material";
import styled from "styled-components";

import hidingImage from "../../assets/images/illustrations/hiding.svg";
import bannerWave from "../../assets/images/waves/banner-wave.svg";

export const BlogWrapper = styled.div`
	display: flex;
	position: relative;
`;

export const BlogListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 380px;
	max-width: 380px;
	background: #dedede30;
	padding-block-start: 20px;
	height: calc(100vh - 64px);
	position: sticky;
	bottom: 0;
`;

export const SearchWrapper = styled.div`
	width: 90%;
	margin-inline: auto;
`;

export const TextFieldWrapper = styled(TextField)`
	fieldset {
		border-radius: 50px;
	}
`;

export const CreateNewBlogWrapper = styled.div`
	width: 90%;
	margin-inline: auto;
	min-height: 115px;
	border-radius: 20px;
	margin-block-start: 15px;
	background: url(${bannerWave});
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: 100%;
	display: flex;
	justify-content: flex-end;
`;

export const CreateNewBlogButton = styled.div`
	width: 160px;
	border-radius: 10px;
	align-self: end;
	margin-inline-end: 10px;
`;

export const BlogListCardsWrapper = styled.div`
	overflow-y: auto;
	margin-top: 10px;
	padding-inline: 5% calc(5% - 10px);
	margin-inline-end: 5px;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px ${(props) => props.theme.palette.primary.main};
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme.palette.primary.main};
		border-radius: 10px;
	}
`;

export const BlogContentWrapper = styled.div`
	display: flex;
	flex-grow: 1;
	height: calc(100vh - 64px);
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px ${(props) => props.theme.palette.primary.main};
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme.palette.primary.main};
		border-radius: 10px;
	}
`;

export const EmptyBlog = styled.div`
	background-image: url(${hidingImage});
	min-width: 40%;
	max-width: 400px;
	aspect-ratio: 16/10;
	margin: auto;
	background-repeat: no-repeat;
	background-size: contain;
	object-fit: contain;
`;
