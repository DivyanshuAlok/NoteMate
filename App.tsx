import {Provider} from 'react-redux';
import React from 'react';
import {store} from './src/redux/store';
import MainNavigation from './src/navigation/MainNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
