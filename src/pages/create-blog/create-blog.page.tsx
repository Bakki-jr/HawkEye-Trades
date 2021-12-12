import { TextareaAutosize, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import DraftJSEditor from "../../components/editor-draftjs/editor-draftjs.component";
import {
	Container,
	AddBlogBackgroundWrapper,
	FromFieldErrorMessageContainer,
	FieldLabel,
	Header,
	AddItemWrapper,
	AddFieldArrayWrapper,
	AddAnotherPositionButton,
	FieldArrayLabel,
} from "./create-blog.styles";
import LoadingButton from "../../components/form-input-fields/button.component";
import {
	useForm,
	SubmitHandler,
	Controller,
	useFieldArray,
	FieldArrayWithId,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import {
	resetSaveBlogStatus,
	SaveBlogContent,
} from "../../features/redux/slice/blog.slice";
import Spinner from "../../components/spinner/spinner.component";
import { isSpinnerReq } from "../../helpers/helper-API-status";
import Toast from "../../components/snackbar/snackbar.component";
import { useHistory } from "react-router";
import { Routes } from "../../constants/route-paths";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AspectRatio } from "@mui/icons-material";

interface IBlog {
	title: string;
	shortDescription: string;
	blogEditor: any;
	externalLinks: any;
}

const schema = yup.object().shape({
	title: yup.string().required("* blog title is Required").max(100),
	shortDescription: yup
		.string()
		.required("* blog description is Required")
		.min(50),
	blogEditor: yup.object().required("* blog content is Required"),
	externalLinks: yup.array().of(
		yup.object().shape({
			link: yup.string(),
		})
	),
});

const CreateBlog = () => {
	const theme = useTheme();
	const history = useHistory();
	const {
		control,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm<IBlog>({
		resolver: yupResolver(schema),
		defaultValues: {
			externalLinks: [{ link: "" }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "externalLinks",
	});
	const [editorData, setEditorData] = useState();
	const userUID = useAppSelector((state) => state.user.uid);
	const saveBlogStatus = useAppSelector((state) => state.blog.saveBlog.status);
	const isSpinnerRequired = isSpinnerReq(saveBlogStatus);
	const dispatch = useAppDispatch();
	useEffect(() => {
		setValue("blogEditor", editorData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editorData]);

	const onBlogSubmit: SubmitHandler<IBlog> = async (data) => {
		dispatch(SaveBlogContent({ ...data, uid: userUID }));
	};

	useEffect(() => {
		saveBlogStatus === "success" && history.push(Routes.BLOG);
		return () => {
			saveBlogStatus === "success" && dispatch(resetSaveBlogStatus());
		};
	}, [saveBlogStatus, history, dispatch]);

	const removeFieldFromFieldArray = (
		remove: (index?: number | number[] | undefined) => void,
		fieldArray: FieldArrayWithId<IBlog, "externalLinks", "id">[],
		index: number
	) => (fieldArray.length !== 1 ? remove(index) : alert("cant remove"));

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
					/>
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
					<FieldArrayLabel>YouTube Links :</FieldArrayLabel>
					{fields.map((field, index) => (
						<AddItemWrapper key={field.id}>
							<Controller
								render={({ field }) => (
									<TextField
										sx={{ width: "88%" }}
										type="text"
										label="link"
										fullWidth
										color="primary"
										autoComplete="off"
										{...field}
									/>
								)}
								name={`externalLinks.${index}.link`}
								control={control}
							/>
							<DeleteForeverIcon
								color="error"
								onClick={() => removeFieldFromFieldArray(remove, fields, index)}
							/>
						</AddItemWrapper>
					))}
					<AddFieldArrayWrapper>
						<AddAnotherPositionButton
							variant="contained"
							onClick={() => append({ link: "" })}
							endIcon={<AddBoxIcon />}
						>
							Include additional link
						</AddAnotherPositionButton>
					</AddFieldArrayWrapper>
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
