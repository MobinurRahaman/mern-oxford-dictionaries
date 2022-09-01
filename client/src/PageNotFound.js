import { Typography } from "@material-ui/core";
import Page from "./components/Page";
import Lottie from "react-lottie";
import animationData from "./lotties/42479-page-not-found-404.json";

export default function PageNotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Page title="Error">
      <div>
        <Lottie options={defaultOptions} height={200} width={280} />
        <Typography variant="body1" align="center">
          404 Page Not Found
        </Typography>
      </div>
    </Page>
  );
}
