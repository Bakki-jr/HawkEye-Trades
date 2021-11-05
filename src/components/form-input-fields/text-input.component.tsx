import React, { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

interface ITextInput {
  label: string;
  name: string;
  type: string;
  handleChange?: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleKeyPress?: any | undefined
  inputRef?: React.Ref<any> | undefined
}

const useStyles: any = makeStyles({
  textField: {
		marginBlock: '10px',
	},
});

const TextInput =({ label, name, type, ...otherProps }: ITextInput) => {
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
    />
  );
};

export default TextInput;
