import {Provider} from 'react-redux';
import React from 'react';
import {store} from './src/redux/store';
import MainNavigation from './src/navigation/MainNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainNavigation />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
