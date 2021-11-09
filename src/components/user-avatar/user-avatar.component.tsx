import { CustomAvatar } from "./user-avatar.styles";

interface IUserAvatar {
	user: {
		name: string;
		photoURL: string | undefined;
	};
	customSize?: number;
}

const UserAvatar = ({ user, customSize }: IUserAvatar) => {
	return (
		<CustomAvatar
			alt={user.name.toUpperCase()}
			src={user.photoURL ? user.photoURL : " "}
			customsize={customSize}
		></CustomAvatar>
	);
};

export default UserAvatar;
