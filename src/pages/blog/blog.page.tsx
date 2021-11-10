import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import {
	BlogContentWrapper,
	BlogListWrapper,
	BlogWrapper,
	EmptyBlog,
	TextFieldWrapper,
	CreateNewBlogWrapper,
	CreateNewBlogButton,
	BlogListCardsWrapper,
	SearchWrapper,
} from "./blog.styles";
import { useTheme } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/form-input-fields/button.component";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Routes } from "../../constants/route-paths";
import BlogCard from "../../components/blog-card/blog-card.component";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import {
	fetchBlogs,
	resetFetchBlogsStatus,
} from "../../features/redux/slice/blog.slice";
import Spinner from "../../components/spinner/spinner.component";
import { isSpinnerReq } from "../../helpers/helper-API-status";
import { fetchUsers } from "../../features/redux/slice/app-users.slice";
import BlogContent from "../../components/blog-details/blog-details.component";

const useStyles: any = makeStyles({
	button: {
		width: "100%",
		height: "36px",
		marginBlock: "10px",
		borderRadius: "20px",
		textTransform: "capitalize",
	},
});

const Blog = () => {
	const history = useHistory();
	const theme = useTheme();
	const classes = useStyles();
	const [blogPosts, setBlogPosts] = useState<any[] | null>(null);
	const [cardSelectedId, setCardSelectedId] = useState<any | null>(null);
	const [selectedBlogUserInfo, setSelectedBlogUserInfo] = useState<any | null>(
		null
	);
	const fetchBlogsStatus = useAppSelector(
		(state) => state.blog.fetchBlogs.status
	);
	const fetchUsersInfoStatus = useAppSelector(
		(state) => state.usersInfo.status
	);
	const blogs = useAppSelector((state) => state.blog.fetchBlogs.blogs);
	const users = useAppSelector((state) => state.usersInfo.users);
	const isSpinnerRequired =
		isSpinnerReq(fetchBlogsStatus) ||
		isSpinnerReq(fetchUsersInfoStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBlogs());
		dispatch(fetchUsers());
		return () => {
			dispatch(resetFetchBlogsStatus());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchUsersInfoStatus === "success" &&
			fetchBlogsStatus === "success" &&
			getBlogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchBlogsStatus, fetchUsersInfoStatus]);

	const getBlogs = () => {
		const BlogPosts: any[] = [];
		blogs.forEach((blog) => {
			users.forEach((user) => {
				if (blog.uid === user.uid) {
					BlogPosts.push({ ...blog, name: user.name, photoURL: user.photoURL });
				}
			});
		});
		setBlogPosts(BlogPosts);
	};

	const handleBlogClick = (item: any) => {
		setSelectedBlogUserInfo({name: item.name, photoURL: item.photoURL});
		setCardSelectedId(item.id);
	};

	const goToPostYourBlog = () => history.push(Routes.ADD_BLOG);

	return (
		<Fragment>
			<BlogWrapper>
				{fetchBlogsStatus === "success" &&
				fetchUsersInfoStatus === "success" &&
				!isSpinnerRequired ? (
					<Fragment>
						<BlogListWrapper>
							<SearchWrapper>
								<TextFieldWrapper
									label="Search By Title"
									fullWidth
									color="primary"
									InputProps={{
										endAdornment: (
											<InputAdornment position="start">
												<IconButton>
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</SearchWrapper>
							<CreateNewBlogWrapper>
								<CreateNewBlogButton>
									<Button
										className={classes.button}
										color="primary"
										endIcon="launch"
										handleClick={goToPostYourBlog}
									>
										Post Your Blog
									</Button>
								</CreateNewBlogButton>
							</CreateNewBlogWrapper>
							<BlogListCardsWrapper theme={theme}>
								{blogPosts?.map((item) => {
									return (
										<BlogCard
											key={item.id}
											cardProps={{
												theme,
												item,
												cardSelectedId,
												handleClick: handleBlogClick,
											}}
										/>
									);
								})}
							</BlogListCardsWrapper>
						</BlogListWrapper>
						<BlogContentWrapper theme={theme}>
							{cardSelectedId ? (
								<Fragment>
									<BlogContent
										theme={theme}
										blogId={cardSelectedId}
										blogPostedBy={selectedBlogUserInfo}
									/>
								</Fragment>
							) : (
								<EmptyBlog />
							)}
						</BlogContentWrapper>
					</Fragment>
				) : null}
			</BlogWrapper>
			{isSpinnerRequired ? <Spinner isLoading={isSpinnerRequired} /> : null}
		</Fragment>
	);
};

export default Blog;
