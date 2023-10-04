import { TextField } from "@mui/material";
const NpvTextField = ({ id, label, value, onChange, name }) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="standard"
      color="success"
      size=""
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
