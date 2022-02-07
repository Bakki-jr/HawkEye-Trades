import { Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { useMemo } from "react";
import { getTimeFromNow } from "../../helpers/helper-date";
import UserAvatar from "../user-avatar/user-avatar.component";
import {
  BlogCardUserInfo,
  BlogCardWrapper,
  BlogCardWrapperHighlighted,
  BlogMiniDescription,
  BlogTitle,
  BlogPostedBy,
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
  const Avatar = useMemo(
    () => <UserAvatar user={{ name: item.name, photoURL: item.photoURL }} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Card theme={theme} onClick={(e) => handleClick(item)}>
      <BlogCardUserInfo>
        {/* <UserAvatar user={{ name: item.name, photoURL: item.photoURL }} /> */}
        {Avatar}
        <BlogTitle>
          <BlogPostedBy>{item.name}</BlogPostedBy>
          <BoldTitle>{item.title}</BoldTitle>
        </BlogTitle>
        <Typography
          variant="body2"
          sx={{ minWidth: "fit-content", textAlign: "right" }}
          color="primary"
        >
          {getTimeFromNow(item.publishedOn)}
        </Typography>
      </BlogCardUserInfo>
      <BlogMiniDescription>{item.shortDescription}</BlogMiniDescription>
    </Card>
  );
};

export default BlogCard;
