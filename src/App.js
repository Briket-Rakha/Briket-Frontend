/* eslint-disable require-jsdoc */
// Import Library
import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-ui/styles';

// Import Router
import Loading from './views/Loading';
import MyRouter from './router';

// Import theme
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <div className="App">
          <MyRouter />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
