import { useTheme } from "@mui/system";
import { PacmanLoader } from "react-spinners";
import useDocumentHeight from "../../hooks/use-document-height";
import { PageSpinnerWrapper } from "./spinner.styles";

interface ISpinner {
	isLoading: boolean;
	[x: string]: any;
}

const Spinner = ({ isLoading, ...otherProps }: ISpinner) => {
	const theme = useTheme();
	const dimensions = useDocumentHeight();
	return (
		<PageSpinnerWrapper height={dimensions} spinnerPosition={otherProps.position}>
			<PacmanLoader
				color={theme.palette.primary.main}
				loading={isLoading}
				{...otherProps}
				size={20}
			/>
		</PageSpinnerWrapper>
	);
};

export default Spinner;
