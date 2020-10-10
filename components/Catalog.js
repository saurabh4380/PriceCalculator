import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Modal
} from 'react-native';

import { Appbar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import CatalogForm from './CatalogForm.js';


export default Catalog = ({ navigation }) => {
  let [DataList, setDataList] = useState([]);
  let [modelOpen, setModelOpen] = useState(false);

  let StorageKey = '8080';
  useEffect(() => {
    let retrieveData = async () => {
      let jsonValue = await AsyncStorage.getItem('8080');
      if (jsonValue !== null) {
        let newData = JSON.parse(jsonValue);
        setDataList(newData);
        console.log('Data from Db is' + JSON.stringify(newData))
      }


    }; retrieveData();

  }
    , [])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log('Data stored in db is' + jsonValue);
      await AsyncStorage.setItem('8080', jsonValue)
    } catch (e) {
      // saving error
      console.error(e)
    }
  }

  let removeItem = (deleteItem) => {
    setDataList((prevState) => {
      let newState = prevState.filter((item) => item.Name != deleteItem.Name)
      storeData(newState);
      return newState;
    });
  }

  return (

    <>
      <View style={{ flex: 1 }}>
        <View >
          <StatusBar backgroundColor={'#0080ff'} barStyle="dark-content" />
          <Appbar.Header style={{ backgroundColor: '#0080ff' }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <Icon name="ios-menu-outline" size={30} color={'#ffffff'} onPress={() => { navigation.toggleDrawer() }} />
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}> Catalog  </Text>
              <Icon name="ios-add" size={30} color={'#ffffff'} style={{ marginRight: 5 }} onPress={() => { setModelOpen(true) }} />

            </View>

          </Appbar.Header>
        </View>


        {
          DataList.length === 0 && <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Text style={{ fontStyle: 'italic', color: "#121212" }}>Tap on the <Icon name="ios-add" size={30} color={'blue'} /> icon above to add items to your Catalog  </Text>
          </View>
        }

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
          <ScrollView >
            <View>

              {


                DataList.map((x, i) => {


                  return (<View key={i} style={{ flex: 1, flexDirection: "column", margin: 10, marginBottom: 2 }}>
                    <Card>
                      <Card.Title title={x.Name}
                        subtitle={<View><Text style={{ color: '#696969' }}>{`${x.Price} ${x.PricingOption}  `}</Text></View>}
                        right={(props) => <Icon name='ios-close' size={30} color={'#900'} onPress={() => removeItem(x)} style={{ marginRight: 2 }}></Icon>}
                      />
                    </Card>
                  </View>)

                })
              }
            </View>

            <Modal transparent={false} visible={modelOpen} animationType="slide">

              <View style={styles.modal} >

                <Icon name="ios-close" size={30} color="#900" onPress={() => { setModelOpen(false) }} style={{ flex: 0, flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }} />

                <CatalogForm DataList={DataList} setDataList={setDataList} setModelOpen={setModelOpen}></CatalogForm>

              </View>

            </Modal>

          </ScrollView>

        </View >

        <View >

        </View>

      </View>

    </>
  );


}

const styles = StyleSheet.create({
  bottomView: {

    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  modal: {

    justifyContent: 'center',
    marginTop: 25,


  }

});
