import React from 'react';
import Main from './pages/Main';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './modules/store'
export default function App() {
  
  return (
    <Provider store={store}>
      <Main />
      <StatusBar style="dark"></StatusBar>
    </Provider>
  );
}

