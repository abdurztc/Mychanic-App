/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Alert, LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';
import store from './redux/store';
import Router from './router';
import NotifService from './NotifService';
import { useState } from 'react';

const MainApp = () => {



  const stateGlobal = useSelector(state => state);
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Remote debugger']);
  LogBox.ignoreAllLogs(['Warning: Each', 'Warning: Failed']);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
    return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
