import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

let InvoiceForm = ({ setModelOpen, calculatePrice }) => {
    let [PickerValues, setPickerValues] = useState([]);
    let retrieveData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('8080');
            if (jsonValue !== null) {
                let newData = await JSON.parse(jsonValue);
                await setPickerValues(newData);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        retrieveData();

    }, [])

    function HandleInvoiceSubmit(values) {

        //validate input and save model
        if (values.Quantity === '') {
            Alert.alert("Hey User", "Please Enter Quantity");
        } else {
            setModelOpen(false);
            console.log(values);
            calculatePrice(values)
        }

    }

    return (
        <>

            <View>
                {
                    PickerValues.length !== 0 &&
                    <Formik initialValues={{Item: "",Quantity: "",Unit: "gm"}} onSubmit={(values) => { HandleInvoiceSubmit(values) }} >
                        {Formikprops => (
                            <View>
                                <Picker selectedValue={Formikprops.values.Item}
                                    mode='dropdown'
                                    style={styles.picker}
                                    onValueChange={Formikprops.handleChange('Item')}>
                                    {PickerValues.map((x, i) => { return (<Picker.Item label={x.Name} value={x.Name} key={i} />) })}
                                </Picker>

                                <TextInput placeholder='Insert Quantity'
                                    keyboardType="numeric"
                                    onChangeText={Formikprops.handleChange("Quantity")}
                                    value={Formikprops.values.Quantity}
                                    style={styles.textInput}>

                                </TextInput>

                                <Picker selectedValue={Formikprops.values.Unit}
                                    style={{ marginBottom: 10 }}
                                    mode='dropdown'
                                    style={styles.picker}
                                    onValueChange={Formikprops.handleChange("Unit")}>
                                    <Picker.Item label="gm" value="gm" />
                                    <Picker.Item label="kg" value="kg" />
                                </Picker>

                                <View style={{ width: 100, margin: 10, alignSelf: 'center' }}>
                                    <Button title="Add item" onPress={Formikprops.handleSubmit}></Button>

                                </View>
                            </View>

                        )}
                    </Formik>
                }
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

export default InvoiceForm;
