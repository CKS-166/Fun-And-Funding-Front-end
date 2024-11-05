import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

//custom
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#1BAA64",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1BAA64 !important",
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 16px",
    fontSize: "1rem",
  },
}));

function SearchBarChat() {
  //hooks
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <CustomTextField
        variant="outlined"
        value={searchValue}
        fullWidth
        placeholder="Search user"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ ml: "0.4rem" }}>
                <SearchIcon style={{ color: "#2F3645" }} />
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}

export default SearchBarChat;
