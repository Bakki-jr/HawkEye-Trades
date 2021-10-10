import React, { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

interface ITextInput {
  label: string;
  name: string;
  type: string;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const useStyles: any = makeStyles({
  textField: {
		marginBlock: '10px',
	},
});

const TextInput = ({ label, name, type, handleChange }: ITextInput) => {
  const classes = useStyles();
  return (
    <TextField
      label={label}
      color="secondary"
      name={name}
      className={classes.textField}
      variant="outlined"
      fullWidth
      type={type}
      onChange={handleChange}
    />
  );
};

export default TextInput;
