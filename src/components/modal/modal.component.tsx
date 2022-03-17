import { useTheme } from "@mui/material";
import useDocumentHeight from "../../hooks/use-document-height";
import {
	Content,
	Footer,
	ModalBackground,
	ModalContainer,
	Title,
} from "./modal.styles";
import Button from "../../components/form-input-fields/button.component";
export interface IModalProps {
	setOpenModal: any;
	modalProps: {
		title: string;
		info: string;
	};
}

const Modal = ({ setOpenModal, modalProps: { title, info } }: IModalProps) => {
	const theme = useTheme();
	const height = useDocumentHeight();
	return (
		<ModalBackground
			onClick={() => {
				setOpenModal(false);
			}}
			height={height}
		>
			<ModalContainer onClick={(e) => {e.stopPropagation()}} theme={theme}>
				<Title data-testid="modal-title">{title}</Title>
				<Content theme={theme}>{info}</Content>
				<Footer>
					<Button
						handleClick={() => {
							setOpenModal(false);
						}}
					>
						Close
					</Button>
				</Footer>
			</ModalContainer>
		</ModalBackground>
	);
};

export default Modal;
