import React from 'react';
import Main from './pages/Main';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <Main />
      <StatusBar style="dark"></StatusBar>
    </>
  );
}

