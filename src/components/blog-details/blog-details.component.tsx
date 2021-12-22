import { Theme } from "@mui/system";
import draftToHtml from "draftjs-to-html";
import { Fragment, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import InputEmoji from "react-input-emoji";
import {
	getDateFromTimeStamp,
	getTimeFromNow,
} from "../../helpers/helper-date";
import {
	BlogHeader,
	SpecificBlogContentWrapper,
	SpecificBlogDescription,
	SpecificBlogPublishedBy,
	SpecificBlogPublishedOn,
	SpecificBlogTitle,
	BlogEditorContent,
	BlogComments,
	BlogCommentInput,
	BlogComemntSubmit,
	CommentsWrapper,
	CommentHeader,
	CommentedBy,
	CommentedOn,
	UserComment,
	BlogCommentsTitle,
	BlogCommentsWrapper,
	YoutubeVideoWrapper,
	ImageThumbnail,
	VideosContainer,
} from "./blog-details.styles";
import LoadingButton from "../../components/form-input-fields/button.component";
import { makeStyles } from "@mui/styles";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import {
	fetchBlogById,
	resetupdateBlogCommentsStatus,
	updateBlogComments,
	updateBlog,
} from "../../features/redux/slice/blog.slice";
import { isSpinnerReq } from "../../helpers/helper-API-status";
import { onSnapshot } from "@firebase/firestore";
import { db } from "../../features/firebase/config";
import { doc } from "firebase/firestore";
import Spinner from "../spinner/spinner.component";
import UserAvatar from "../user-avatar/user-avatar.component";
import Player from "../player/player.component";

interface IBlogContent {
	theme: Theme;
	blogId: string;
	blogPostedBy: {
		name: string;
		photoURL: string;
	};
}

const useStyles: any = makeStyles({
	button: {
		width: "100%",
		height: "36px",
		marginBlock: "10px",
		borderRadius: "20px",
		textTransform: "capitalize",
	},
});

const BlogContent = ({ theme, blogId, blogPostedBy }: IBlogContent) => {
	const classes = useStyles();
	const userUID = useAppSelector((state) => state.user.uid);
	const fetchedBlog = useAppSelector((state) => state.blog.fetchBlogById.blog);
	const users = useAppSelector((state) => state.usersInfo.users);
	const fetchedBlogStatus = useAppSelector(
		(state) => state.blog.fetchBlogById.status
	);
	const fetchUpdateCommentStatus = useAppSelector(
		(state) => state.blog.updateComments.status
	);
	const updateCommentStatus = useAppSelector(
		(state) => state.blog.updateComments.status
	);

	useEffect(() => {
		dispatch(fetchBlogById(blogId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogId]);

	useEffect(() => {
		const subscription = onSnapshot(doc(db, "blogs", blogId), (blogs) => {
			dispatch(updateBlog(blogs.data()));
		});
		return () => {
			subscription();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchUpdateCommentStatus === "success"]);

	const isBlogFetched = isSpinnerReq(fetchedBlogStatus);
	const isSpinnerRequired = isSpinnerReq(updateCommentStatus);
	const dispatch = useAppDispatch();
	const rawContentState = fetchedBlog?.blogEditor;
	const hashtagConfig = {
		trigger: "#",
		separator: " ",
	};
	const markup = draftToHtml(rawContentState, hashtagConfig);
	const [comment, setComment] = useState("");

	const getUser = (uid: string) => {
		const filteredUser = users.find((user) => {
			if (user.uid === uid) {
				return user;
			} else {
				return null;
			}
		});
		return filteredUser;
	};

	const getYoutubeID = (url: any) => {
		return url.match(
			/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
		)[1];
	};

	const getYoutubeURL = (url: any) => {
		const id = getYoutubeID(url);
		return `https://www.youtube.com/watch?v=${id}`;
	};

	const getYoutubeThumbnail = (url: any) => {
		const id = getYoutubeID(url);
		return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
	};

	const [openPlayerModal, setOpenPlayerModal] = useState(false);
	const [youTubeURL, setYouTubeURL] = useState("");

	const toggleModalStatus = () => setOpenPlayerModal(!openPlayerModal);
	
	const invokeReactPlayer = (youtubeURL: string) => {
		setOpenPlayerModal(!openPlayerModal);
		setYouTubeURL(youtubeURL);
	};

	const handleCommentSubmit = async (comment: string) => {
		if (!comment) return;
		const commentInfo = {
			uid: userUID,
			createdAt: new Date(),
			comment,
		};
		const comments = [...fetchedBlog.comments, commentInfo];
		await dispatch(updateBlogComments({ id: fetchedBlog.id, comments }));
		setComment("");
		dispatch(resetupdateBlogCommentsStatus());
	};

	return (
		<SpecificBlogContentWrapper theme={theme}>
			{fetchedBlogStatus === "success" ? (
				<Fragment>
					<BlogHeader>
						<UserAvatar user={blogPostedBy} />
						<SpecificBlogPublishedBy>
							{blogPostedBy.name}
						</SpecificBlogPublishedBy>
						<SpecificBlogPublishedOn color={theme.palette.primary.main}>
							{fetchedBlog?.publishedOn &&
								getDateFromTimeStamp(fetchedBlog?.publishedOn)}
						</SpecificBlogPublishedOn>
					</BlogHeader>
					<SpecificBlogTitle>{fetchedBlog?.title}</SpecificBlogTitle>
					<SpecificBlogDescription>
						{fetchedBlog?.shortDescription}
					</SpecificBlogDescription>
					<BlogEditorContent>{ReactHtmlParser(markup)}</BlogEditorContent>
					<VideosContainer>
						{fetchedBlog?.externalLinks &&
						fetchedBlog.externalLinks[0].link
							? fetchedBlog.externalLinks.map((item: any) => (
									<YoutubeVideoWrapper
										onClick={() => invokeReactPlayer(getYoutubeURL(item.link))}
									>
										<ImageThumbnail
											src={getYoutubeThumbnail(item.link)}
											alt=""
										/>
									</YoutubeVideoWrapper>
							  ))
							: null}
					</VideosContainer>
					{fetchedBlog?.comments?.length > 0 ? (
						<BlogCommentsTitle>Comments:</BlogCommentsTitle>
					) : null}
					<BlogComments theme={theme}>
						<BlogCommentsWrapper theme={theme}>
							{fetchedBlog?.comments?.map((item: any, index: number) => {
								return (
									<CommentsWrapper key={index}>
										<CommentHeader>
											<UserAvatar
												user={{
													name: getUser(item.uid).name,
													photoURL: getUser(item.uid).photoURL,
												}}
											/>
											<CommentedBy>{getUser(item.uid).name}</CommentedBy>
											<CommentedOn color={theme.palette.primary.main}>
												{item.createdAt ? getTimeFromNow(item.createdAt) : null}
											</CommentedOn>
										</CommentHeader>
										<UserComment>{item.comment}</UserComment>
									</CommentsWrapper>
								);
							})}
						</BlogCommentsWrapper>
					</BlogComments>
					<BlogCommentInput>
						<InputEmoji
							placeholder="post your comment...!"
							value={comment}
							onChange={setComment}
							cleanOnEnter
							onEnter={handleCommentSubmit}
							height={25}
						/>
						<BlogComemntSubmit>
							<LoadingButton
								className={classes.button}
								color="primary"
								endIcon="send"
								handleClick={() => handleCommentSubmit(comment)}
								loading={isSpinnerRequired}
							>
								Submit
							</LoadingButton>
						</BlogComemntSubmit>
					</BlogCommentInput>
					<Player
						open={openPlayerModal}
						toggleModal={toggleModalStatus}
						url={youTubeURL}
					/>
				</Fragment>
			) : null}
			{isBlogFetched ? (
				<Spinner isLoading={isBlogFetched} position="relative" />
			) : null}
		</SpecificBlogContentWrapper>
	);
};

export default BlogContent;
