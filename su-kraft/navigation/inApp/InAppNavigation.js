import {NavigationContainer} from "@react-navigation/native";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchStack from "./SearchStack";
import CameraScreen from "../../screens/userScreens/CameraScreen";
import CameraStack from "./CameraStack";

const Tab = createBottomTabNavigator();

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
                    name='Camera'
                    component={CameraStack}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="camera" color={color} size={26}/>
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
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default InAppNavigation;