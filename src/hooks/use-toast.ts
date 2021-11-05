import { SnackbarOrigin, useSnackbar, VariantType } from "notistack";

interface IToast {
	message: string;
	variant?: VariantType;
	verticalAlignment?: SnackbarOrigin["vertical"];
	horizontalAlignment?: SnackbarOrigin["horizontal"];
}

const useToast = () => {
	const { enqueueSnackbar } = useSnackbar();
	return (toastProperties: IToast) =>
		snackBar(enqueueSnackbar, toastProperties);
};

const snackBar = (enqueueSnackbar: any, toastProperties: IToast) => {
	const { message, variant, verticalAlignment, horizontalAlignment } =
		toastProperties;
	enqueueSnackbar(message, {
		anchorOrigin: {
			vertical: verticalAlignment ? verticalAlignment : "bottom",
			horizontal: horizontalAlignment ? horizontalAlignment : "right",
		},
		preventDuplicate: true,
		variant: variant ? variant : "success",
	});
};

export default useToast;
