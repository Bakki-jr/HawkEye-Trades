import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import {
	BlogCardUserInfo,
	BlogContentWrapper,
	BlogListWrapper,
	BlogMiniDescription,
	BlogTitle,
	BlogWrapper,
	EmptyBlog,
	TextFieldWrapper,
} from "./blog.styles";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/system";
import styled from "styled-components";
import { useState } from "react";

const blogPost = [
	{
		id: 1,
		userName: "Phani",
		title: "Trade in Coal India",
		publishedOn: "24-Sep-2021",
		description:
			"Aute mollit laboris commodo veniam in eu voluptate velit aute esse minim ullamco consectetur.",
	},
	{
		id: 2,
		userName: "Ravi",
		title: "Trade in Coal India",
		publishedOn: "14-Sep-2021",
		description:
			"Aute mollit laboris commodo veniam in eu voluptate velit aute esse minim ullamco consectetur.",
	},
	{
		id: 3,
		userName: "user",
		title: "Trade in Coal India",
		publishedOn: "22-Sep-2021",
		description:
			"Aute mollit laboris commodo veniam in eu voluptate velit aute esse minim ullamco consectetur.Aliquip mollit culpa ex aliquip dolor ut laborum in eu duis consequat.",
	},
	{
		id: 4,
		userName: "balu",
		title: "Trade in TCS",
		publishedOn: "24-Sep-2021",
		description:
			"Aute mollit laboris commodo veniam in eu voluptate velit aute esse minim ullamco consectetur.",
	},
];


const Blog = () => {
	const theme = useTheme();
	const [cardSelected, setCardSelected] = useState<any | null>(null);
	const BlogCardWrapper = styled.div`
		padding: 10px;
		background: ${theme.palette.mode === "dark" ? "#000a1240" : "#00000020"};
		border-radius: 20px;
		margin-block: 15px;
		cursor: pointer;
		&:hover {
			background: ${theme.palette.primary.main};
		}
	`;

	const BlogCardWrapperHighlighted = styled.div`
		padding: 10px;
		background: ${theme.palette.mode === "dark" ? "#000a1240" : "#00000020"};
		border-radius: 20px;
		margin-block: 15px;
		cursor: pointer;
		background: ${theme.palette.primary.main};
	`;


	const handleBlogClick = (item: any) => {
		setCardSelected(item);
	}; 

	return (
		<BlogWrapper>
			<BlogListWrapper>
				<TextFieldWrapper
					label="search by title"
					fullWidth
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
				<div>
					{blogPost.map((item) => {
						const BlogCard = (item.id ===  cardSelected?.id) ? BlogCardWrapperHighlighted : BlogCardWrapper;
						return (
							<BlogCard onClick={(e) => handleBlogClick(item)} key={item.id}>
								<BlogCardUserInfo>
									<Avatar>{item.userName[0].toUpperCase()}</Avatar>
									<BlogTitle>
										<div>{item.userName}</div>
										<div>{item.title}</div>
									</BlogTitle>
									<div>{item.publishedOn}</div>
								</BlogCardUserInfo>
								<BlogMiniDescription>{item.description}</BlogMiniDescription>
							</BlogCard>
						);
					})}
				</div>
			</BlogListWrapper>
			<BlogContentWrapper>
					{cardSelected ? '': <EmptyBlog/>}
			</BlogContentWrapper>
		</BlogWrapper>
	);
};

export default Blog;
