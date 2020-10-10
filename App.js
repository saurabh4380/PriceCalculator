/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Modal
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Catalog from './components/Catalog';
import CatalogForm from './components/CatalogForm';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Invoice from './components/Invoice';

const Drawer = createDrawerNavigator();


const App = () => {

  return (
    <>

      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Invoice">

          <Drawer.Screen name="Catalog  " component={Catalog} />
          <Drawer.Screen name="Invoice  " component={Invoice} />

        </Drawer.Navigator>
      </NavigationContainer>

    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },

  modal: {

    justifyContent: 'center',
    marginTop: 25,


  }
});

export default App;
