import styled from "styled-components";

export const EditorWrapper = styled.div`
	min-height: 400px;
	background-color: #ffffff50;
	color: #000;
	margin-inline: auto;
	border-radius: 15px;
	padding: 15px;
	> div > .rdw-editor-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-inline: auto;
		border-radius: 10px;
	}
	.rdw-editor-main {
		color: ${props => props.theme.palette.mode === 'dark' ? '#fff' : '#000'};
    min-height: 300px;
	}
`;
