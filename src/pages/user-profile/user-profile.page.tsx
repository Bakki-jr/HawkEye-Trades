import { useTheme } from "@mui/material";
import UserAvatar from "../../components/user-avatar/user-avatar.component";
import { useAppSelector } from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import {
	UserProfileContainer,
	UserProfileWrapper,
} from "./user-profile.styles";

const UserProfile = () => {
	const theme = useTheme();
	const userInfo = useAppSelector((state) => state.user);
	console.log(userInfo);
	return (
		<UserProfileContainer>
			<UserProfileWrapper theme={theme}>
        <UserAvatar userName="P" customSize={100}/>
      </UserProfileWrapper>
		</UserProfileContainer>
	);
};

export default UserProfile;
