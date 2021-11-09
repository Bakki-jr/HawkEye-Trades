import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "draft-js/dist/Draft.css";
import { useState } from "react";
import { EditorWrapper } from "./editor-draftjs.styles";
import { useTheme } from "@mui/material";

export const DraftJSEditor = ({ setEditorData }: any) => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const theme = useTheme();

	const uploadImageCallBack = async (file: any) => {
		const imageResponse = await postData(
			"https://api.imgur.com/3/image",
			file
		).then((data) => {
			return data;
		});
		return imageResponse;
	};

	const postData = async (url = "", data: any) => {
		const formData = new FormData();
		formData.append("image", data);
		const response = await fetch(url, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				Authorization: "Client-ID 894c5368167f679",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: formData,
		}).then((res) => res.json());
		return response;
	};

	const onEditorStateChange = (editorState: EditorState) => {
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		setEditorState(editorState);
		setEditorData(rawContentState);
	};

	return (
		<EditorWrapper theme={theme}>
			<Editor
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				placeholder="Write something!"
				toolbar={{
					inline: { inDropdown: true },
					list: { inDropdown: true },
					textAlign: { inDropdown: true },
					link: { inDropdown: true },
					history: { inDropdown: true },
					image: {
						uploadCallback: uploadImageCallBack,
						alt: { present: true, mandatory: false },
					},
				}}
			/>
		</EditorWrapper>
	);
};

export default DraftJSEditor;
