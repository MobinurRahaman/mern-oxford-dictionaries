import { makeStyles } from "@material-ui/core/styles";

const useAsyncSearchSuggestionsStyles = makeStyles((theme) => ({
  autocomplete: {
    [theme.breakpoints.up("md")]: {
      maxWidth: 300,
    },
  },
  input: {
    color: "#fff",
  },
  endAdornment: {
    marginRight: 35,
  },
}));

export default useAsyncSearchSuggestionsStyles;
