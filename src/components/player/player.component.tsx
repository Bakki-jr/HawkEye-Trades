import React from "react";
import ReactPlayer from "react-player/youtube";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";

interface IPlayerProps {
	open: boolean;
	toggleModal: () => void;
	url: string;
}

const Player = ({ open, toggleModal, url }: IPlayerProps) => {
	return (
		<Modal
			open={open}
			onClose={toggleModal}
			styles={{
				modal: {
					maxWidth: "70%",
					width: "100%",
					padding: "unset",
					marginInlineStart: "50px",
					marginBlockStart: "70px",
					overflow: "hidden",
				},
				overlay: {
					background: "rgba(0, 0, 0, 0.5)",
				},
				closeButton: {
					background: "#fff",
					borderRadius: "50%",
				},
			}}
			center
		>
			<ReactPlayer
				url={url}
				controls
				width="100%"
				height="calc(100vh - 300px)"
			/>
		</Modal>
	);
};
export default Player;
