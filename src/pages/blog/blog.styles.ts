import { TextField } from "@mui/material";
import styled from "styled-components";

import hidingImage from "../../assets/illustrations/hiding.svg";

export const BlogWrapper = styled.div`
	display: flex;
`;

export const BlogListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	background: #dedede30;
	padding: 20px;
	height: calc(100vh - 64px);
`;

export const TextFieldWrapper = styled(TextField)`
	fieldset {
		border-radius: 50px;
	}
`;

export const BlogCardUserInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const BlogTitle = styled.div`
	flex-grow: 1;
	margin-left: 10px;
`;

export const BlogMiniDescription = styled.div`
	font-size: 12px;
	margin-block-start: 10px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
`;

export const BlogContentWrapper = styled.div`
	display: flex;
	flex-grow: 1;
	height: calc(100vh - 64px);
`;

export const EmptyBlog = styled.div`
	background-image: url(${hidingImage});
	width: 500px;
	aspect-ratio: 1;
	margin: auto;
	background-repeat: no-repeat;
	background-size: contain;
	object-fit: contain;
`;
