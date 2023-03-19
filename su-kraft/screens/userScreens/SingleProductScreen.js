import ScreenBackground from "../../components/ScreenBackground";
import {Card, IconButton, Text} from "react-native-paper";
import {Skeleton} from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import {CartContext} from "../../contexts/CartContext";
import {View} from "react-native";

const SingleProductScreen = (props) => {
    const product = props.route.params.product;
    const {cart, changeCart} = useContext(CartContext);


    console.log("IN SCREEN CART", cart)

    const inCartAmount = cart?.find(x => x?.itemId === product?.id)?.amount;

    const addToCart = () => {
        let newCart = [];
        const oldItem = cart?.find(x => x?.itemId === product?.id);
        if (oldItem){
            newCart = [...cart.filter(x => x?.itemId !== product?.id), {itemId: product?.id, amount: oldItem.amount + 1}];
        } else {
            newCart = [...cart, {itemId: product?.id, amount: 1}];
        }
        changeCart(newCart);
    }

    const subtractFromCart = () => {
        let newCart = [];
        const oldItem = cart?.find(x => x?.itemId === product?.id);
        if (inCartAmount > 1){
            newCart = [...cart.filter(x => x?.itemId !== product?.id), {itemId: product?.id, amount: oldItem.amount - 1}];
        } else {
            newCart = [...cart.filter(x => x?.itemId !== product?.id)];
        }
        changeCart(newCart);
    }

    return(
        <ScreenBackground>
            <KeyboardAwareScrollView style={{flex: 1}}>
                <Card style={{width: '100%', marginTop: 20, marginBottom: 20}}>
                    {
                            product.image === 'No Image' ?
                                <Card.Cover source={{ uri: product?.image }} />
                                :
                                <Card.Cover source={{ uri: product?.image }} />
                    }
                    <Card.Content>
                        <Text variant="headlineLarge">{product?.name}</Text>
                        <Text variant="titleLarge">{product?.description}</Text>
                        <Card>
                            <Card.Content>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text variant="bodyLarge">Cena: {product?.price}</Text>
                                    <IconButton mode='contained' icon='minus' size={16} onPress={() => {subtractFromCart()}} />
                                    <Text variant="bodyLarge">{inCartAmount ? inCartAmount : "0"}</Text>
                                    <IconButton mode='contained' icon='plus' size={16} onPress={() => {addToCart()}} />
                                </View>
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>
            </KeyboardAwareScrollView>
        </ScreenBackground>
    )
}

export default SingleProductScreen;