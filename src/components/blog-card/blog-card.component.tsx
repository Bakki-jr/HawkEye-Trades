import { Avatar, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { getTimeFromNow } from "../../helpers/helper-date";
import {
	BlogCardUserInfo,
	BlogCardWrapper,
	BlogCardWrapperHighlighted,
	BlogMiniDescription,
	BlogTitle,
	BoldTitle,
} from "./blog-card.styles";

interface IBlogCard {
	theme: Theme;
	item: any;
	cardSelectedId: string;
	handleClick: (item: any) => void;
}

const BlogCard = ({
	cardProps: { theme, item, cardSelectedId, handleClick },
}: {
	cardProps: IBlogCard;
}) => {
	const Card =
		item.id === cardSelectedId ? BlogCardWrapperHighlighted : BlogCardWrapper;
	return (
		<Card theme={theme} onClick={(e) => handleClick(item)}>
			<BlogCardUserInfo>
				<Avatar>{item.userName[0].toUpperCase()}</Avatar>
				<BlogTitle>
					<div>{item.userName}</div>
					<BoldTitle>{item.title}</BoldTitle>
				</BlogTitle>
				<Typography variant="body2" color="primary">
					{getTimeFromNow(item.publishedOn)}
				</Typography>
			</BlogCardUserInfo>
			<BlogMiniDescription>{item.shortDescription}</BlogMiniDescription>
		</Card>
	);
};

export default BlogCard;
