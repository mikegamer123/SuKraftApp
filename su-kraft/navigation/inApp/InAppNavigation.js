import {NavigationContainer} from "@react-navigation/native";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const InAppNavigation = (props) => {
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

    return (
        <NavigationContainer linking={linking}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    labelShown: false,
                }}
                labeled={false}
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
                initialRouteName='Home'
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
                {/*<Tab.Screen*/}
                {/*    name='Home'*/}
                {/*    component={HomeStack}*/}
                {/*    options={{*/}
                {/*        tabBarLabel: 'Home',*/}
                {/*        tabBarIcon: ({color}) => (*/}
                {/*            <MaterialCommunityIcons name="magnify" color={color} size={26}/>*/}
                {/*        ),*/}
                {/*    }}*/}
                {/*/>*/}
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
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default InAppNavigation;