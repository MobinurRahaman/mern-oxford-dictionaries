import { makeStyles } from "@material-ui/core/styles";

const useListContainerStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "column-reverse",
  },
}));

export default useListContainerStyles;
