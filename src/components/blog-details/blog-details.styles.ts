import { Theme } from "@mui/system";
import styled from "styled-components";

interface ICommentsWrapperProps {
	theme: Theme;
	index: number;
}

interface IComponentWrapper {
	wrapperProps: ICommentsWrapperProps;
}

export const SpecificBlogContentWrapper = styled.div`
	background-color: ${(props) =>
		props.theme.palette.mode === "dark"
			? props.theme.palette.secondary.dark
			: "#00000020"};
	width: 100%;
	height: fit-content;
	margin: 10px;
	border-radius: 10px;
	padding: 10px;
`;

export const BlogHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const SpecificBlogPublishedBy = styled.div`
	flex-grow: 1;
	margin-inline-start: 10px;
`;

export const SpecificBlogPublishedOn = styled.div`
	color: ${(props) => props.color};
`;

export const SpecificBlogTitle = styled.div`
	text-align: center;
	margin: 10px;
	font-size: 24px;
`;

export const SpecificBlogDescription = styled.div`
	width: 96%;
	margin-inline: auto;
	text-align: justify;
`;

export const BlogEditorContent = styled.div`
	img {
		max-width: 100%;
		aspect-ratio: 16/9;
		padding: 15px;
	}
`;

export const BlogCommentsTitle = styled.div`
	max-width: 500px;
	margin: 0 auto;
	font-size: 20px;
	margin-block: 10px;
`;

export const CommentsWrapper = styled.div<IComponentWrapper>`
	max-width: 500px;
	margin: 0 auto;
	padding: 10px;
	margin-block: 5px;
	border-radius: 10px;
	background-color: ${({ wrapperProps: { theme, index } }) =>
		theme.palette.mode === "dark" && index % 2 === 0
			? "#ffffff80"
			: theme.palette.mode === "dark" && index % 2 !== 0
			? "#ffffff20"
			: theme.palette.mode === "light" && index % 2 === 0
			? "#00000030"
			: "#00000010"};
`;

export const CommentHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const CommentedBy = styled.div`
	flex-grow: 1;
	margin-inline-start: 10px;
`;

export const CommentedOn = styled.div`
	color: ${(props) => props.color};
`;

export const UserComment = styled.div`
	margin-block-start: 10px;
`;

export const BlogComments = styled.div`
	max-height: 500px;
  max-width: 500px;
  padding-inline: 10px 15px;
  margin-inline: auto;
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

export const BlogCommentInput = styled.div`
	max-width: 500px;
	margin-inline: auto;
	display: flex;
	flex-direction: column;
	align-items: end;
`;

export const BlogComemntSubmit = styled.div`
	width: 125px;
`;
