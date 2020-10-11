import React from 'react';
import {StyleSheet,View,TextInput,Button,Keyboard, Alert} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

export default CatalogForm = ({DataList,setDataList,setModelOpen}) => {

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          console.log('Data stored in db is'+jsonValue);
          await AsyncStorage.setItem('8080', jsonValue)
        } catch (e) {
          // saving error
          console.error(e)
        }
      }

      let AddItem = async (item)=>{
        let tempStorage=  [...DataList, item]; 
         setDataList(tempStorage); 
        await storeData(tempStorage); 
         setModelOpen(false);

      }

      function HandleCatalogInput(values){
          if(values.Name === '' || values.Price === ''){
              Alert.alert("Please wait","Please enter all the details")
          }else{
              Keyboard.dismiss();
              AddItem(values);
          }

      }
    return (
        <>

            <View>
                <Formik initialValues={{ Name: "", Price: "", PricingOption: "per kg" }} onSubmit={(values) => {HandleCatalogInput(values) }} >
                    {Formikprops => (
                        <View>
                            <TextInput placeholder='Insert Name'
                                onChangeText={Formikprops.handleChange('Name')}
                                value={Formikprops.values.Name}
                                style={styles.textInput}>

                            </TextInput>

                            <TextInput placeholder='Insert Price'
                                keyboardType="numeric"
                                onChangeText={Formikprops.handleChange('Price')}
                                value={Formikprops.values.Price}
                                style={styles.textInput}>

                            </TextInput>

                            <Picker selectedValue={Formikprops.values.PricingOption}
                                style={{ marginBottom: 10 }}
                                mode='dropdown'
                                style={styles.picker}
                                onValueChange={Formikprops.handleChange('PricingOption')}>
                                <Picker.Item label="per kg" value="per kg" />
                                <Picker.Item label="per gm" value="per gm" />
                            </Picker>

                            <View style={{ width: 100, marginTop: 10, alignSelf: 'center' }}>
                                <Button title='Add Item' onPress={Formikprops.handleSubmit}></Button>

                            </View>
                            
                        </View>

                    )}
                </Formik>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        margin: 20,
        borderWidth: 1,
        borderColor: '#A9A9A9',
        borderRadius: 8
    },
    picker: {
        margin: 20,

    }

});