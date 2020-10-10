import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Button,
    ScrollView,
    View,
    Text,
    StatusBar, Modal
} from 'react-native';

import { Appbar, Card, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
//import InvoiceForm from './InvoiceForm';


export default InvoiceGenerator = () => {
    let [DataList, setDataList] = useState([]);
    let [modelOpen, setModelOpen] = useState(false);
    let StorageKey = '8080';

    let retrieveData = async () => {
        try{
            let jsonValue = await AsyncStorage.getItem(StorageKey);
            if(jsonValue !== null){
                let newData = await JSON.parse(jsonValue);
                setDataList(newData);
            }
        }catch(e){
            console.log(e);
        }
      
       
        console.log('Data from Db is' + JSON.stringify(newData))

    };
    useEffect(() => {
         retrieveData();

    }
        , [])

    return (
        <>
        <View style={{ flex: 1 }}>
            <View>
                <StatusBar backgroundColor={'#b19cd9'} />
                <Appbar.Header style={{ backgroundColor: '#b19cd9' }}>
                    <Text style={{ flex: 1, flexDirection: "row", textAlign: "center", fontSize: 18, fontWeight: "bold", color: "#fff" }}>Invoice</Text>
                </Appbar.Header>
            </View>


            <Modal transparent={true} visible={modelOpen} animationType="slide">
                <View style={styles.modal} >
                    <Card style={{ margin: 10, elevation: 5 }}>
                        <Icon name="ios-close" size={30} color="#900" onPress={() => { setModelOpen(false) }} style={{ flex: 0, flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />
                        {/* <InvoiceForm></InvoiceForm> */}
                    </Card>



                </View>

            </Modal>

            <FAB
                style={styles.fab}
                color="white"
                icon="plus"
                onPress={() => setModelOpen(true)}
            />


        </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: "#b19cd9"

    },
    modal: {

        justifyContent: 'center',
        marginTop: 25,


    }
})