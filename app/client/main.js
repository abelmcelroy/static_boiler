import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './storageConfig'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import FirstComponent from './components/firstComponent'
import * as Sentry from '@sentry/browser'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    attachStacktrace: true,
    beforeBreadcrumb(breadcrumb) {
      return breadcrumb.category === 'console' ? null : breadcrumb;
    },
    environment: process.env.NODE_ENV,
    release: `build-${process.env.BUILD_ID}`,
  });
}

const theme = createMuiTheme({
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <FirstComponent/>
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>
  , document.getElementById('main')
);