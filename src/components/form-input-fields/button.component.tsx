import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LaunchIcon from "@mui/icons-material/Launch";
import { makeStyles } from "@mui/styles";
interface IButton {
	handleClick?: (event: any) => void;
	color?:
		| "inherit"
		| "error"
		| "primary"
		| "secondary"
		| "info"
		| "success"
		| "warning"
		| undefined;
	startIcon?: "google" | undefined;
	endIcon?: "send" | "google" | "door" | "launch" | undefined;
	children: string;
	className?: object;
	type?: "button" | "submit" | "reset" | undefined;
	loading?: boolean;
}

const useStyles: any = makeStyles({
	button: {
		width: "100%",
		height: "50px",
		marginBlock: "10px",
		textTransform: "capitalize",
	},
});

const Button = ({
	handleClick,
	color,
	startIcon,
	endIcon,
	className,
	type,
	loading,
	...props
}: IButton) => {
	const classes = useStyles();

	const getIcon = (iconType: string) => {
		if (iconType === "send") return <SendIcon />;
		if (iconType === "google") return <GoogleIcon />;
		if (iconType === "door") return <MeetingRoomIcon />;
		if (iconType === "launch") return <LaunchIcon />;
	};

	return (
		<LoadingButton
			onClick={handleClick}
			endIcon={endIcon ? getIcon(endIcon) : undefined}
			startIcon={startIcon ? getIcon(startIcon) : undefined}
			loading={loading}
			loadingPosition={endIcon ? "end" : undefined}
			variant="contained"
			color={color ? color : undefined}
			type={type ? type : "button"}
			className={className ? className : classes.button}
		>
			{props.children}
		</LoadingButton>
	);
};

export default Button;
