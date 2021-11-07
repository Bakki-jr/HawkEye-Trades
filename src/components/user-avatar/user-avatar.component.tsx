import { CustomAvatar } from "./user-avatar.styles";

interface IUserAvatar {
	userName: string | null;
	customSize?: number;
}

const UserAvatar = ({ userName, customSize }: IUserAvatar) => {
	return <CustomAvatar customSize={customSize}>{userName}</CustomAvatar>;
};

export default UserAvatar;
