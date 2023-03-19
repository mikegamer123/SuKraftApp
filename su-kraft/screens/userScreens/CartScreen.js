import ScreenBackground from "../../components/ScreenBackground";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../contexts/CartContext";
import {getAllProducts} from "../../fetch/products";
import {Avatar, Button, Card, Divider, IconButton, Text, TextInput} from "react-native-paper";
import {Alert, ScrollView, View} from "react-native";
import {UserContext} from "../../contexts/UserContext";
import {createOrder} from "../../fetch/orders";
import {useNavigation} from "@react-navigation/native";

const CartScreen = () => {
    const {cart, changeCart} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const [allProducts, setAllProducts] = useState([]);
    const [address, setAddress] = useState("");
    const navigation = useNavigation();

    const getProducts = async () => {
        await getAllProducts().then(async r => {
            const res = await r.json();
            setAllProducts(res.map(x => ({
                ...x.product,
                other: {...x}
            })));
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    const finishCheckout = async () => {
        const basicOrderData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phoneNo,
            userID: user.id,
            address: address
        }
        for await (let cartItem of cart) {
            const cartItemFull = allProducts?.find(x => cartItem?.itemId === x.id);
            console.log("WW", cartItemFull);
            await createOrder({
                ...basicOrderData,
                sellerID: cartItemFull?.other?.seller?.id,
                description: cartItemFull?.description,
                products: [cartItemFull?.id],
                counts: [cartItem.amount],
            }).then(async r => {
                const res = await r.json();
                console.log("REZ", res, {
                    ...basicOrderData,
                    sellerID: cartItemFull?.other?.seller?.id,
                    description: cartItemFull?.description,
                    products: [cartItemFull?.id],
                    counts: [cartItem.amount],
                })
            })
        }
        await changeCart([]);
        Alert.alert("Obaveštenje", "Uspešno ste kreirali narudžbu",
            [{text: 'U redu', onPress: () => navigation.navigate("Search")}])
    }

    return (
        <ScreenBackground>
            <ScrollView style={{flex: 1}}>

                <Card style={{marginVertical: 20}}>
                    <Card.Title
                        title='Vaša korpa'
                        left={(props) => <Avatar.Icon {...props} icon="cart"/>}
                    />
                    <Card.Content>
                        {
                            cart.map(x => {
                                const product = allProducts?.find(y => y.id === x?.itemId);
                                if (product?.name) {
                                    return (
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginVertical: 10
                                        }}>
                                            <Text variant='bodyLarge'>{product?.name}</Text>
                                            <Card style={{width: '100%'}}>
                                                <Card.Content>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text
                                                            variant="bodyLarge">Cena: {product?.price * x.amount}</Text>
                                                        <IconButton mode='contained' icon='minus' size={13}
                                                                    onPress={() => {
                                                                        if (x.amount > 1) {
                                                                            changeCart([...cart.filter(x => x?.itemId !== product?.id), {
                                                                                itemId: product?.id,
                                                                                amount: x.amount - 1
                                                                            }])
                                                                        } else {
                                                                            changeCart([...cart.filter(x => x?.itemId !== product?.id)]);
                                                                        }
                                                                    }}/>
                                                        <Text variant="bodyLarge">{x.amount ? x.amount : "0"}</Text>
                                                        <IconButton mode='contained' icon='plus' size={13}
                                                                    onPress={() => {
                                                                        changeCart([...cart.filter(x => x?.itemId !== product?.id), {
                                                                            itemId: product?.id,
                                                                            amount: x.amount + 1
                                                                        }]);
                                                                    }}/>
                                                    </View>
                                                </Card.Content>
                                            </Card>
                                            <Divider style={{marginVertical: 10}}/>
                                        </View>
                                    )
                                }
                            })
                        }
                    </Card.Content>
                </Card>
                <TextInput
                    label="Adresa"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    mode='outlined'
                    multiline
                    style={{marginBottom: 10}}
                />
                <Button mode='contained' onPress={() => {
                    finishCheckout()
                }}>Završi kupovinu</Button>
            </ScrollView>
        </ScreenBackground>
    )
}

export default CartScreen;