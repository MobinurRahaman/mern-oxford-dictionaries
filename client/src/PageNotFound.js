import { Typography } from '@material-ui/core';
import Page from './components/Page'

export default function PageNotFound() {
  return (
    <Page title="Error">
      <div>
        <Typography variant="body1" align="center">
          404 Page Not Found
        </Typography>
      </div>
    </Page>
  )
}