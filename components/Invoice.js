import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Dimensions,
    ScrollView,
    View,
    Text,
    StatusBar, Modal, Alert
} from 'react-native';
import { Appbar, Card, Button, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import InvoiceForm from './InvoiceForm';
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';






export default Invoice = ({ navigation }) => {

    let [InvoiceList, setInvoiceList] = useState([]);
    let [modelOpen, setModelOpen] = useState(false);
    let [CatalogDataCount, setCatalogDataCount] = useState([]);

    const isFocused = useIsFocused();

    let retrieveData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('8080');
            if (jsonValue !== null) {
                let newData = await JSON.parse(jsonValue);
                console.log(typeof newData)
                setCatalogDataCount(newData);
            }

        } catch (e) {
            console.log(e);
        }



    };



    useEffect(() => {
        retrieveData();




    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = retrieveData();


        }, [])
    );

    let removeItem = (deleteItem) => {
        setInvoiceList((prevState) => {
            let newState = prevState.filter((item) => item.Name != deleteItem.Name)
            return newState;
        });
    }

    async function calculatePrice(values) {
        let Name = values.Item;
        let Quantity = values.Quantity;
        let Unit = values.Unit;
        
        let CatalogData = await AsyncStorage.getItem('8080')
        let temp = await JSON.parse(CatalogData);
//Fix for a bug which doesn't displays Price for the First element in Catalog
        if(Name === ""){
            Name = temp[0].Name;
        }

        let Cost;
        let PricingOption;
        await temp.forEach(element => {
            if (element.Name === Name) {
                Cost = element.Price;
                PricingOption = element.PricingOption;
            }
        });

        //handles Unit conversion logic
        let QuantityCopy = Quantity;

        if (Unit !== 'gm')
            Quantity = Quantity * 1000;

        if (PricingOption !== 'per gm')
            Cost = Cost / 1000;

        let FinalPrice = Math.round(Quantity * Cost);
        const obj = { "Name": Name, "Quantity": `${QuantityCopy}${Unit}`, "Price": FinalPrice };


        setInvoiceList([...InvoiceList, obj])



    }

    function calculateTotalPrice() {
        let TotalPrice = 0;
        InvoiceList.forEach(x => {
            TotalPrice += x.Price;
        })
        return TotalPrice;
    }

    function OpenModal() {
        if (CatalogDataCount.length === 0) {
            Alert.alert('Enter data')
        } else {
            setModelOpen(true)

        }

    }



    return (
        <>


            <View style={{ flex: 1, }}>
                <View>
                    <StatusBar backgroundColor={'#0080ff'} barStyle='light-content' />
                    <Appbar.Header style={{ backgroundColor: '#0080ff' }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <Icon name="ios-menu-outline" size={30} color={'#ffffff'} onPress={() => { navigation.toggleDrawer() }} />
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Invoice  </Text>
                            <Icon name="ios-add" size={30} color={'#ffffff'} style={{ marginRight: 5 }} onPress={() => { OpenModal() }} />

                        </View>


                    </Appbar.Header>
                </View>
                {CatalogDataCount.length === 0 &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Text>Please add items to you Catalog  </Text>
                        <Button color={'white'} style={{ backgroundColor: '#0080ff', margin: 10 }} onPress={() => { navigation.navigate('Catalog  ') }}>Go to Catalog</Button>
                    </View>
                }

                <ScrollView>
                    {InvoiceList.map((x, i) => {
                        return (<View key={i} style={{ flex: 1, flexDirection: 'column', margin: 8, }}>
                            <Card >
                                <Card.Title title={x.Name}
                                    subtitle={<View><Text style={{ color: '#696969' }}>{`${x.Quantity}  `}</Text></View>}
                                    right={(props) => <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 22, marginRight: 5 }}>{`र. ${x.Price}  `}</Text>}



                                />
                                <Card.Actions style={{ margin: -10 }}>
                                    <Button onPress={() => { removeItem(x) }}>Delete</Button>
                                </Card.Actions>
                            </Card>
                        </View>)
                    })}
                </ScrollView>





                <Modal transparent={true} visible={modelOpen} animationType="slide">
                    <View style={styles.modal} >
                        <Card style={{ margin: 10, elevation: 10 }}>
                            <Icon name="ios-close" size={30} color="#900" onPress={() => { setModelOpen(false) }} style={{ flex: 0, flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />
                            <InvoiceForm setModelOpen={setModelOpen} calculatePrice={calculatePrice}></InvoiceForm>

                        </Card>



                    </View>

                </Modal>
            </View>
            { CatalogDataCount.length > 0 &&
                < Surface style={styles.fab}>
                    <Icon name="md-refresh-sharp" size={30} color="red" style={{ marginRight: 10 }} onPress={() => { setInvoiceList([]) }} />

                    <View style={{ flex: 0.4, flexDirection: 'row', }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Total Price  </Text>
                        <Icon name="arrow-forward" size={25} style={{ marginLeft: 10 }} color={'#fff'} />

                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                            {`र. ${calculateTotalPrice()}  `}
                        </Text>
                    </View>
                </Surface>
            }
        </>
    )

}

const styles = StyleSheet.create({
    fab: {
        flex: 0.060,
        flexDirection: 'row',
        position: 'relative',
        padding: 8,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        //bottom: 2,
        backgroundColor: "#BE90D4",

    },
    modal: {

        justifyContent: 'center',
        marginTop: '10%',



    }
})