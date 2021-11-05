import { useSnackbar, VariantType } from "notistack";

interface IToast {
	message: string;
	variant?: VariantType;
}

const Toast = ({ message, variant="success" }: IToast) => {
	const { enqueueSnackbar } = useSnackbar();
	enqueueSnackbar(message, {
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "right",
		},
    preventDuplicate: true,
		variant,
	});
	return null;
};

export default Toast;
