import {NavigationContainer} from "@react-navigation/native";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchStack from "./SearchStack";
import CameraScreen from "../../screens/userScreens/CameraScreen";
import CameraStack from "./CameraStack";
import CartStack from "./CartStack";
import {View} from "react-native";
import {Badge} from "react-native-paper";
import {useContext} from "react";
import {CartContext} from "../../contexts/CartContext";

const Tab = createBottomTabNavigator();

const InAppNotSellerNavigation = (props) => {
    const {cart} = useContext(CartContext);

    const linking = {
        prefixes: [
            "localhost:19000",
        ],
        config: {
            screens: {
                initialRouteName: 'Profile',
                Profile:
                    {
                        initialRouteName: 'ProfileScreen',
                        screens:
                            {
                                ProfileScreen: '/profile',
                            }
                    },
                Home:
                    {
                        initialRouteName: 'HomeScreen',
                        screens:
                            {
                                HomeScreen: '/home'
                            }
                    },
            }
        }
    }

    let inCartAmount = 0;
    if (cart?.length > 0){
        cart.forEach(x => {
            inCartAmount += x.amount;
        })
    }

    return (
        <NavigationContainer linking={linking}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    labelShown: false,
                    showLabel: false,
                    "tabBarShowLabel": false,
                }}
                labeled={false}
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
                initialRouteName='Search'
            >
                <Tab.Screen
                    name='Home'
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name='Search'
                    component={SearchStack}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="account" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name='Cart'
                    component={CartStack}
                    options={{
                        tabBarLabel: 'Cart',
                        tabBarIcon: ({color}) => (
                            <View style={{position: 'relative'}}>
                                <MaterialCommunityIcons name="cart" color={color} size={26}/>
                                {
                                    inCartAmount > 0 &&
                                    <Badge style={{position: 'absolute', right: -8, top: -8}}>{inCartAmount}</Badge>
                                }
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default InAppNotSellerNavigation;