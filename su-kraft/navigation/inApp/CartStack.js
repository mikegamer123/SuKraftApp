import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import CartScreen from "../../screens/userScreens/CartScreen";

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="CartScreen"
            screenOptions={{
                headerShown: false,
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='CartScreen'
                component={CartScreen}
                options={{title: "Cart"}}
            />
        </Stack.Navigator>
    )
}

export default CartStack;