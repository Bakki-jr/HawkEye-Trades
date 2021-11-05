import { TextareaAutosize, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import DraftJSEditor from "../../components/editor-draftjs/editor-draftjs.component";
import {
	Container,
	AddBlogBackgroundWrapper,
	FromFieldErrorMessageContainer,
	FieldLabel,
	Header,
} from "./create-blog.styles";
import LoadingButton from "../../components/form-input-fields/button.component";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { resetSaveBlogStatus, SaveBlogContent } from "../../features/redux/slice/blog.slice";
import Spinner from "../../components/spinner/spinner.component";
import { isAPIFetchedSuccefully } from "../../helpers/helper-API-status";
import Toast from "../../components/snackbar/snackbar.component";
import { useHistory } from "react-router";
import { Routes } from "../../constants/route-paths";

interface IBlog {
	title: string;
	blogEditor: any;
	shortDescription: string;
}

const schema = yup.object().shape({
	title: yup.string().required("* blog title is Required").max(100),
	blogEditor: yup.object().required("* blog content is Required"),
	shortDescription: yup
		.string()
		.required("* blog description is Required")
		.min(50),
});

const CreateBlog = () => {
	const theme = useTheme();
	const history = useHistory();
	const {
		control,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm<IBlog>({ resolver: yupResolver(schema) });
	const [editorData, setEditorData] = useState();
	const userUID = useAppSelector((state) => state.user.uid);
	const saveBlogStatus = useAppSelector((state) => state.blog.saveBlog.status);
	const isSpinnerRequired = isAPIFetchedSuccefully(saveBlogStatus);
	const dispatch = useAppDispatch();
	useEffect(() => {
		setValue("blogEditor", editorData);
	}, [editorData, setValue]);

	const onBlogSubmit: SubmitHandler<IBlog> = async (data) => {
		dispatch(SaveBlogContent({ ...data, uid: userUID }));
	};

	useEffect(() => {
		saveBlogStatus === "success" && history.push(Routes.BLOG);
		return () => {
			saveBlogStatus === "success" && dispatch(resetSaveBlogStatus());
		};
	}, [saveBlogStatus, history, dispatch]);

	return (
		<Container>
			<AddBlogBackgroundWrapper theme={theme.palette}>
				<Header>Create Blog</Header>
				<form onSubmit={handleSubmit(onBlogSubmit)}>
					<Controller
						name="title"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								type="text"
								label="Title"
								fullWidth
								color="primary"
								autoComplete="off"
								{...field}
							/>
						)}
					/>{" "}
					<FromFieldErrorMessageContainer>
						{errors.title?.message}
					</FromFieldErrorMessageContainer>
					<FieldLabel>Description: </FieldLabel>
					<Controller
						name="shortDescription"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextareaAutosize
								minRows={4}
								placeholder="short description..."
								style={{
									minWidth: "100%",
									maxWidth: "100%",
									background: "#ffffff50",
									color: theme.palette.mode === "dark" ? "#fff" : "#000",
									fontSize: "20px !important",
									borderRadius: "5px",
									padding: "10px",
								}}
								{...field}
							/>
						)}
					/>
					<FromFieldErrorMessageContainer>
						{errors.shortDescription?.message}
					</FromFieldErrorMessageContainer>
					<DraftJSEditor {...{ setEditorData }} />
					<FromFieldErrorMessageContainer>
						{errors.blogEditor?.message}
					</FromFieldErrorMessageContainer>
					<LoadingButton
						color="primary"
						type="submit"
						endIcon="send"
						loading={isSpinnerRequired}
					>
						Submit Your Blog !!
					</LoadingButton>
				</form>
			</AddBlogBackgroundWrapper>
			{isSpinnerRequired ? <Spinner isLoading={isSpinnerRequired} /> : null}
			{saveBlogStatus === "success" ? (
				<Toast message="Blog Post Saved Successfully" variant="success" />
			) : null}
		</Container>
	);
};

export default CreateBlog;
