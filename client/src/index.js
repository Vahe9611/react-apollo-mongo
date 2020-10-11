import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import { ApolloProvider } from '@apollo/client';
import client from 'graphQl/init-apollo';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <SnackbarProvider 
        maxSnack={3} 
        hideIconVariant
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById('root')
);
