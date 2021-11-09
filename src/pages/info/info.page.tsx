import { useTheme } from "@mui/material";
import { useState } from "react";
import Modal, { IModalProps } from "../../components/modal/modal.component";
import {
	InfoPageContentWrapper,
	InfoWrapper,
	librariesUsed,
	LibraryImage,
	LibraryItem,
	LibraryTitle,
	Title,
} from "./info.styles";

const InfoPage = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalProps, setModalprops] = useState<IModalProps["modalProps"]>({
		title: "",
		info: "",
	});
	const theme = useTheme();

	const handleModal = (library: any) => {
		setModalOpen(true);
		setModalprops(library);
	};

	return (
		<InfoPageContentWrapper>
			<Title theme={theme}>Major Libraries Used:</Title>
			<InfoWrapper>
				{librariesUsed.map((item, index) => {
					return (
						<LibraryItem key={index} onClick={() => handleModal(item)}>
							<LibraryImage item={item} />
							<LibraryTitle>{item.title}</LibraryTitle>
						</LibraryItem>
					);
				})}
			</InfoWrapper>
			{modalOpen && (
				<Modal setOpenModal={setModalOpen} modalProps={modalProps} />
			)}
		</InfoPageContentWrapper>
	);
};

export default InfoPage;
