import React from 'react';
import Catalog from './components/Catalog';
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


export default App;
