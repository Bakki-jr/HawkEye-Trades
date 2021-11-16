import { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

interface ITextInput {
	label: string;
	name: string;
	type: string;
	handleChange?: (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	handleKeyPress?: any | undefined;
	isAutoFocusRequired?: boolean;
	autoCompleteInfo?: any;
}

const useStyles: any = makeStyles({
	textField: {
		marginBlock: "10px",
	},
});

const TextInput = ({ label, name, type, ...otherProps }: ITextInput) => {
	const classes = useStyles();

	return (
		<TextField
			label={label}
			color="primary"
			name={name}
			className={classes.textField}
			variant="outlined"
			fullWidth
			type={type}
			onChange={otherProps?.handleChange}
			onKeyPress={otherProps?.handleKeyPress}
			autoComplete={
				otherProps.autoCompleteInfo ? otherProps.autoCompleteInfo : "off"
			}
			autoFocus={
				otherProps?.isAutoFocusRequired ? otherProps?.isAutoFocusRequired : undefined
			}
		/>
	);
};

export default TextInput;
