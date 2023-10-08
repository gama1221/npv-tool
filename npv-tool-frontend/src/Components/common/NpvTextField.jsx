import { TextField } from "@mui/material";
const NpvTextField = ({ id, label, value, onChange, name, type,variant }) => {
  return (
    <TextField
      id={id}
      label={label}
      color="success"
      size="small"
      variant={variant}
      type={type}
      required
      sx={{ width: "45ch" }}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full max-w-full"
    />
  );
};

export default NpvTextField;
