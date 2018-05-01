import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './main.jsx';

const root = document.getElementById('root');
const load = () => render(
  (
    <AppContainer>
      <Main />
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./main', load);
}

load();