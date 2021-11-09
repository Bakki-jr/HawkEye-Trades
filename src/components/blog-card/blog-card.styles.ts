import styled from "styled-components";

export const BlogCardWrapper = styled.div`
	padding: 10px;
	background: ${(props) =>
		props.theme.palette.mode === "dark" ? "#000a1240" : "#00000020"};
	border-radius: 20px;
	margin-block: 15px;
	cursor: pointer;
	&:hover {
		background: ${(props) => props.theme.palette.secondary.light};
	}
`;

export const BlogCardWrapperHighlighted = styled.div`
	padding: 10px;
	background: ${(props) =>
		props.theme.palette.mode === "dark" ? "#000a1240" : "#00000020"};
	border-radius: 20px;
	margin-block: 15px;
	cursor: pointer;
	background: ${(props) => props.theme.palette.secondary.dark};
`;

export const BlogCardUserInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const BlogTitle = styled.div`
	flex-grow: 1;
	margin-inline: 8px 5px;
`;

export const BoldTitle = styled.div`
	font-weight: bold;
  text-transform: capitalize;
`;

export const BlogMiniDescription = styled.div`
	font-size: 14px;
	margin-block-start: 10px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
`;

export const BlogPostedBy = styled.div`
  text-transform: capitalize;
`;